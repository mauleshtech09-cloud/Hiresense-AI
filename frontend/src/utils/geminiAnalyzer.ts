// utils/geminiAnalyzer.ts
// Sends extracted resume text + job role to Gemini API and returns structured JSON analysis.

import type { CandidateReport, CandidateScore } from '../context/AppStateContext';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (resumeText: string, jobRole: string): string => \`
You are a Senior HR Data Scientist & Lead Principal Engineer for the HireSense AI Intelligent Engine - Tier: Master Analysis.

CRITICAL: Perform a multi-pass deep scan of the provided resume. Do not hallucinate. If data is missing, mark as 'NOT PROVIDED' and penalize the weight accordingly. Use the HireSense Evaluation Formula: Domain (35%), Skills (25%), Experience (15%), Education (10%), Certs (10%), Support (5%).

ANALYSIS PARAMETERS
API Mode: Deep Reasoning + Image/PDF Understanding.
Tone: Professional, Analytical, Decisive.
Reference: Compare candidate data against industrial standards.

Return the extracted data in STRICT JSON format ONLY.
Do NOT include any markdown, code fences, explanation, or text outside the JSON object.

The JSON must follow this exact schema:
{
  "basicInfo": { "name": "string", "contact": "string", "portfolioLinks": ["string"], "summarySentiment": "string" },
  "educationalBackground": { "degrees": ["string"], "institutions": ["string"], "graduationYear": "string", "relevance": "string" },
  "skillGapAnalysis": { "hardSkillsFound": ["string"], "missingHighImpactSkills": ["string"] },
  "experienceDepth": { "chronologicalBreakdown": "string", "tenure": "string", "careerProgression": "string" },
  "salaryAlignment": { "extractedExpectedSalary": "string" },
  "geographicFlexibility": { "currentLocation": "string", "relocationRemotePreference": "string" },
  "projectsAndAchievementsAlignment": { "analyzedProjects": ["string"], "quantifiableMetrics": ["string"] },
  "overallEvaluation": { "domain": number, "skills": number, "experience": number, "education": number, "certs": number, "support": number, "totalScore": number },
  "suitabilityStatus": { "status": "SELECTED | WAITLISTED | REJECTED", "justification": "string (2-3 sentences of cold, hard logic based on the score)" },
  "strategicInterviewQuestions": ["string", "string", "string", "string", "string"]
}

Resume Text:
"""
\${resumeText}
"""
\`.trim();

/**
 * Helper to fetch with exponential backoff on 429 (Quota Exceeded)
 */
const fetchWithRetry = async (
    url: string,
    options: any,
    retries = 3, // 3 baar try karega
    delay = 15000 // 15 seconds wait karega
): Promise<Response> => {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
        console.warn(`Quota exceeded. Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 1.5); // Agli baar 22.5 sec wait karega
    }
    return response;
};
/**
 * Sends resume text to Gemini and returns a parsed CandidateReport (without id/date fields).
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

    // Extract raw text from Gemini response
    const rawText: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!rawText) {
        throw new Error('Gemini returned an empty response. Please try again.');
    }

    // Strip any accidental markdown fences
    const cleaned = rawText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/gi, '')
        .trim();

    // Safely parse JSON
    let parsed: any;
    try {
        parsed = JSON.parse(cleaned);
    } catch {
        // Try extracting JSON object substring as fallback
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

    // Validate and clamp score values
    const clamp = (val: any, min: number, max: number): number =>
        Math.min(max, Math.max(min, Number(val) || 0));

    const evalData = parsed.overallEvaluation || {};
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

    const statusMatch = parsed.suitabilityStatus?.status || 'REJECTED';
    const recommendation = statusMatch === 'SELECTED' ? 'Highly Suitable' 
        : statusMatch === 'WAITLISTED' ? 'Moderately Suitable' 
        : 'Not Suitable';

    const report: CandidateReport = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        candidateName: parsed.basicInfo?.name || fileName.replace(/\.pdf$/i, ''),
        jobRole,
        score: totalScore,
        scoreBreakdown,
        candidateDomain: parsed.basicInfo?.summarySentiment || 'Unknown',
        jobDomain: jobRole,
        domainMatchStatus: totalScore > 40 ? 'Match' : 'Mismatch',
        topSkills: Array.isArray(parsed.skillGapAnalysis?.hardSkillsFound) ? parsed.skillGapAnalysis.hardSkillsFound : [],
        missingCriticalSkills: Array.isArray(parsed.skillGapAnalysis?.missingHighImpactSkills) ? parsed.skillGapAnalysis.missingHighImpactSkills : [],
        strengths: Array.isArray(parsed.projectsAndAchievementsAlignment?.quantifiableMetrics) ? parsed.projectsAndAchievementsAlignment.quantifiableMetrics : [],
        weaknesses: [],
        experienceEvaluation: parsed.experienceDepth?.tenure || '',
        educationAlignment: parsed.educationalBackground?.relevance || '',
        criticalGaps: Array.isArray(parsed.skillGapAnalysis?.missingHighImpactSkills) ? parsed.skillGapAnalysis.missingHighImpactSkills : [],
        roleSuitability: parsed.suitabilityStatus?.justification || '',
        recommendation,
        matchedSkills: Array.isArray(parsed.skillGapAnalysis?.hardSkillsFound) ? parsed.skillGapAnalysis.hardSkillsFound : [],
        masterAnalysis: parsed
    };

    return report;
};