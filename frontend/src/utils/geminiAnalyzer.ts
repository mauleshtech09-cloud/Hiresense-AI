// utils/geminiAnalyzer.ts
// Sends extracted resume text + job role to Gemini API and returns structured JSON analysis.

import type { CandidateReport, CandidateScore } from '../context/AppStateContext';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (resumeText: string, jobRole: string): string => `
ROLE: Lead HR Data Auditor & Principal Systems Engineer
GOAL: Execute "Zero-Compromise" Deep Scan & 10-Section Analysis
CONTEXT: HireSense AI Intelligent Candidate Engine for role: "${jobRole}"

CRITICAL: Access the provided resume file. You are forbidden from generating generic responses. Every sentence must be grounded in the candidate's actual text. If information is missing, explicitly state 'DATA NOT FOUND' and assign a 0 value to that specific sub-weight.

1. THE EVALUATION ALGORITHM (HireSense Blueprint)
You must apply the following 100-point scoring logic:
- Domain Relevance (35%): Alignment with the specific industry group.
- Skill Match (25%): Presence of core technical skills from taxonomy.
- Experience Depth (15%): Tenure, career progression, and seniority.
- Educational Background (10%): Degree relevance and institution tier.
- Certifications (10%): Valid professional licenses/certs.
- Supportive Evidence (5%): Portfolio, GitHub, and additional achievements.

2. THE 10-SECTION MASTER REPORT STRUCTURE
[SECTION 1: BASIC INFO] Full Name, Primary Contact, Professional Links, and current Role Title.
[SECTION 2: EDUCATIONAL BACKGROUND] Degree, Major, Institution, Graduation Date. Note academic honors.
[SECTION 3: TECHNICAL SKILL INVENTORY] Categorize Hard Skills found. Identify "Skill Gaps".
[SECTION 4: CHRONOLOGICAL EXPERIENCE] List roles, companies, dates. Total years, Job Hopping vs Tenure.
[SECTION 5: SALARY EXPECTATION ANALYSIS] Extract or benchmark candidate's market value.
[SECTION 6: GEOGRAPHIC DATA] Current Location, Relocation Status, Remote vs On-site.
[SECTION 7: PROJECTS & ACHIEVEMENTS ALIGNMENT] Analyzed projects, extract quantifiable metrics mapped to skills.
[SECTION 8: MATHEMATICAL EVALUATION] Domain [X/35], Skills [X/25], Experience [X/15], Education [X/10], Certs [X/10], Support [X/5]. Total HIRESENSE SCORE: [X/100].
[SECTION 9: SUITABILITY VERDICT] Status: HIRE / WAITLIST / REJECT. Justification: Data-driven logic. No fluff.
[SECTION 10: PRECISION INTERVIEW QUESTIONS] 5 highly technical questions designed to test specific Skill Gaps.

3. QUALITY CONSTRAINTS
Best API Protocol: Use deep reasoning and multi-modal scanning.
No Compromise: If a resume is weak, the report must be brutally honest.
Formatting: Use clear headers and bullet points for high readability WITHIN the string outputs of the JSON payloads.

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
        candidateDomain: parsed.basicInfo?.slice(0, 100) || 'Unknown',
        jobDomain: jobRole,
        domainMatchStatus: totalScore > 50 ? 'Match' : 'Mismatch',
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