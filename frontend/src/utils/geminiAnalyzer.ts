// utils/geminiAnalyzer.ts
// Sends extracted resume text + job role to Gemini API and returns structured JSON analysis.

import type { CandidateReport, CandidateScore } from '../context/AppStateContext';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (resumeText: string, jobRole: string): string => `
ROLE: Lead HR Data Auditor & Principal Systems Engineer
GOAL: Execute "Zero-Compromise" High-Accuracy Cross-Referenced Analysis
CONTEXT: HireSense AI Intelligent Candidate Engine (Recursive Comparison Mode) for role: "${jobRole}"

CRITICAL: Perform a 'Double-Pass' analysis. Pass 1: Extract Job Requirements based on the Target Role in the Taxonomy. Pass 2: Extract Candidate Data from Resume. Final Step: Map Candidate Data to Requirements using a 'Requirement vs. Fulfillment' logic. If data is missing, mark as 'CRITICAL GAP' and assign 0 weight.

1. THE EVALUATION ALGORITHM (HireSense Blueprint)
You must apply the following 100-point scoring logic:
- Domain Relevance (35%): Alignment with Industry Group + Role Taxonomy.
- Skill Match (25%): Technical overlap with Taxonomy-defined skills.
- Experience Depth (15%): Tenure vs. Seniority expectations.
- Educational Background (10%): Degree relevance to Domain.
- Certifications (10%): Licensing compliance.
- Supportive Evidence (5%): Portfolio/Metric validation.

2. THE 10-SECTION CROSS-REFERENCED REPORT
[SECTION 1: BASIC INFO] Requirement: Professional Identity. Extraction: Name, Contact, Social Links, Current Title.
[SECTION 2: EDUCATIONAL BACKGROUND] Fulfillment: Degree/Major/Uni vs. Role Requirement. Match Status: [EXCEEDS / MEETS / BELOW]
[SECTION 3: TECHNICAL SKILL INVENTORY (THE MATRIX)] Taxonomy Required Skills: List 4 skills from relevant Industry Batch. Candidate Actual Skills: [List skills found in resume]. Comparison: Identify "Direct Matches," "Adjacent Skills," and "Critical Gaps." Use tables.
[SECTION 4: EXPERIENCE DEPTH & TENURE] Analysis: Career trajectory (Growth vs Stagnation). Highlight tenure stability.
[SECTION 5: SALARY & MARKET VALUE] Target: Benchmark for Role. Extracted/Estimated: Market value based on skill density.
[SECTION 6: GEOGRAPHIC & LOGISTICAL DATA] Status: Current Location vs. Office Hub. Preference: Remote flexibility vs. Corporate policy.
[SECTION 7: PROJECT-SKILL ALIGNMENT] The Proof: Map specific achievements to Technical Skills. Metrics: Extract specific percentages, dollar amounts.
[SECTION 8: MATHEMATICAL WEIGHTING EVALUATION] Domain: [X/35], Skills: [X/25], Experience: [X/15], Education: [X/10], Certs: [X/10], Support: [X/5]. TOTAL SCORE: [X/100].
[SECTION 9: SUITABILITY VERDICT & LOGIC] Decision: [HIRE / WAITLIST / REJECT] Logic: Direct comparison of Score vs. Role Benchmark (75+ is HIRE). Highlight highest single Deal-Breaker or Success-Factor.
[SECTION 10: PRECISION INTERVIEW QUESTIONS] Generate 5 technical questions exposing Critical Gaps and verifying Metrics.

3. TECHNICAL CONSTRAINTS
Groundedness: No hallucinations. Every score must have a quoted text reference from the resume.
Depth: Scan hidden patterns (e.g., skill mentions in project descriptions).
Formatting: Use tables for Comparison Sections where possible within the string outputs of the JSON payload fields.

STRICT INSTRUCTION: Return the extracted data in STRICT JSON format ONLY. 
Do NOT include any markdown code fences surrounding the JSON. Output MUST match this schema exactly:

{
  "basicInfo": "Markdown string",
  "educationalBackground": "Markdown string",
  "skillInventory": "Markdown string",
  "chronologicalExperience": "Markdown string",
  "salaryExpectation": "Markdown string",
  "geographicData": "Markdown string",
  "projectsAchievements": "Markdown string",
  "mathematicalEvaluation": {
     "domain": number,
     "skills": number,
     "experience": number,
     "education": number,
     "certs": number,
     "support": number,
     "totalScore": number
  },
  "suitabilityVerdict": {
     "status": "HIRE | WAITLIST | REJECT",
     "justification": "Markdown string"
  },
  "interviewQuestions": ["q1", "q2", "q3", "q4", "q5"],
  "extractedName": "string",
  "skillGaps": ["missing skill 1", "missing skill 2"],
  "hardSkillsFound": ["found skill 1", "found skill 2"]
}

Resume Text:
"""
${resumeText}
"""
`.trim();

/**
 * Helper to fetch with exponential backoff on 429 (Quota Exceeded)
 */
const fetchWithRetry = async (
    url: string,
    options: any,
    retries = 3,
    delay = 15000
): Promise<Response> => {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
        console.warn(`Quota exceeded. Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 1.5);
    }
    return response;
};

/**
 * Sends resume text to Gemini and returns a parsed CandidateReport.
 */
export const analyzeResumeWithGemini = async (
    resumeText: string,
    jobRole: string,
    fileName: string
): Promise<CandidateReport> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in your .env file.');
    }

    const prompt = buildPrompt(resumeText, jobRole);

    const response = await fetchWithRetry(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 2048,
            },
        }),
    });

    if (!response.ok) {
        const errBody = await response.text().catch(() => '');
        throw new Error(`Gemini API error ${response.status}: ${response.statusText}. ${errBody.slice(0, 200)}`);
    }

    const data = await response.json();
    const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!rawText) {
        throw new Error('Gemini returned an empty response. Please try again.');
    }

    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    let parsed: any;
    try {
        parsed = JSON.parse(cleaned);
    } catch {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (!match) {
            throw new Error('Gemini did not return valid JSON. Please retry.');
        }
        try {
            parsed = JSON.parse(match[0]);
        } catch {
            throw new Error('Could not parse Gemini response as JSON. Please retry.');
        }
    }

    const clamp = (val: any, min: number, max: number): number =>
        Math.min(max, Math.max(min, Number(val) || 0));

    const evalData = parsed.mathematicalEvaluation || {};
    
    const scoreBreakdown: CandidateScore = {
        total: clamp(evalData.totalScore || 0, 0, 100),
        domainRelevance: clamp(evalData.domain, 0, 35),
        skillMatch: clamp(evalData.skills, 0, 25),
        experienceMatch: clamp(evalData.experience, 0, 15),
        educationMatch: clamp(evalData.education, 0, 10),
        certifications: clamp(evalData.certs, 0, 10),
        supportingSkills: clamp(evalData.support, 0, 5),
    };

    const totalScore = scoreBreakdown.total;
    const statusMatch = parsed.suitabilityVerdict?.status || 'REJECTED';
    const recommendation = statusMatch === 'HIRE' ? 'Highly Suitable' 
        : statusMatch === 'WAITLIST' ? 'Moderately Suitable' 
        : 'Not Suitable';

    const report: CandidateReport = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        candidateName: parsed.extractedName || fileName.replace(/\.pdf$/i, ''),
        jobRole,
        score: totalScore,
        scoreBreakdown,
        candidateDomain: String(parsed.basicInfo || '').slice(0, 100) || 'Unknown',
        jobDomain: jobRole,
        domainMatchStatus: totalScore > 75 ? 'Match' : 'Mismatch',
        topSkills: Array.isArray(parsed.hardSkillsFound) ? parsed.hardSkillsFound : [],
        missingCriticalSkills: Array.isArray(parsed.skillGaps) ? parsed.skillGaps : [],
        strengths: [],
        weaknesses: [],
        experienceEvaluation: parsed.chronologicalExperience || '',
        educationAlignment: parsed.educationalBackground || '',
        criticalGaps: Array.isArray(parsed.skillGaps) ? parsed.skillGaps : [],
        roleSuitability: parsed.suitabilityVerdict?.justification || '',
        recommendation,
        matchedSkills: Array.isArray(parsed.hardSkillsFound) ? parsed.hardSkillsFound : [],
        masterAnalysis: parsed
    };

    return report;
};