// utils/geminiAnalyzer.ts
// Sends extracted resume text + job role to Gemini API and returns structured JSON analysis.

import type { CandidateReport, CandidateScore } from '../context/AppStateContext';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (resumeText: string, jobRole: string): string => `
You are an expert document analyst specializing in resume data extraction.

Extract the following information from the resume and compare it with the requirements for the position: "${jobRole}".

Return the extracted data in STRICT JSON format ONLY.
Do NOT include any markdown, code fences, explanation, or text outside the JSON object.

The JSON must follow this exact schema:
{
  "candidateName": "string – full name extracted from resume, or 'Unknown Candidate'",
  "candidateDomain": "string – primary domain of expertise (e.g. Software Development, UI/UX, etc.)",
  "jobDomain": "string – domain associated with the role '${jobRole}'",
  "domainMatchStatus": "Match or Mismatch",
  "score": number (0-100, calculated as sum of breakdown fields),
  "scoreBreakdown": {
    "domainRelevance": number (0-35),
    "skillMatch": number (0-25),
    "experienceMatch": number (0-15),
    "educationMatch": number (0-10),
    "certifications": number (0-10),
    "supportingSkills": number (0-5)
  },
  "topSkills": ["array of up to 6 key skills found in resume"],
  "missingCriticalSkills": ["array of required skills not found in resume"],
  "strengths": ["array of 2-4 candidate strengths"],
  "weaknesses": ["array of 2-4 gaps or areas for improvement"],
  "experienceEvaluation": "string – summary of experience relevance",
  "educationAlignment": "string – summary of education relevance",
  "criticalGaps": ["array of 1-3 critical missing requirements"],
  "roleSuitability": "string – 2-3 sentence summary of candidate's alignment for the position",
  "recommendation": "exactly one of: Highly Suitable | Moderately Suitable | Low Suitability | Not Suitable"
}

Extraction rules:
- Provide factual summaries based ONLY on the provided text.
- Match scores should reflect objective alignment with '${jobRole}'.

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

    const scoreBreakdown: CandidateScore = {
        total: 0, // Placeholder, will be updated below
        domainRelevance: clamp(parsed.scoreBreakdown?.domainRelevance, 0, 35),
        skillMatch: clamp(parsed.scoreBreakdown?.skillMatch, 0, 25),
        experienceMatch: clamp(parsed.scoreBreakdown?.experienceMatch, 0, 15),
        educationMatch: clamp(parsed.scoreBreakdown?.educationMatch, 0, 10),
        certifications: clamp(parsed.scoreBreakdown?.certifications, 0, 10),
        supportingSkills: clamp(parsed.scoreBreakdown?.supportingSkills, 0, 5),
    };

    const totalScore =
        scoreBreakdown.domainRelevance +
        scoreBreakdown.skillMatch +
        scoreBreakdown.experienceMatch +
        scoreBreakdown.educationMatch +
        scoreBreakdown.certifications +
        scoreBreakdown.supportingSkills;

    scoreBreakdown.total = totalScore;

    const validRecommendations = ['Highly Suitable', 'Moderately Suitable', 'Low Suitability', 'Not Suitable'];
    const recommendation = validRecommendations.includes(parsed.recommendation)
        ? parsed.recommendation
        : totalScore > 75 ? 'Highly Suitable'
            : totalScore > 60 ? 'Moderately Suitable'
                : totalScore > 40 ? 'Low Suitability'
                    : 'Not Suitable';

    const report: CandidateReport = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        candidateName: parsed.candidateName || fileName.replace(/\.pdf$/i, ''),
        jobRole,
        score: clamp(totalScore, 0, 100),
        scoreBreakdown,
        candidateDomain: parsed.candidateDomain || 'Unknown',
        jobDomain: parsed.jobDomain || jobRole,
        domainMatchStatus: parsed.domainMatchStatus === 'Match' ? 'Match' : 'Mismatch',
        topSkills: Array.isArray(parsed.topSkills) ? parsed.topSkills : [],
        missingCriticalSkills: Array.isArray(parsed.missingCriticalSkills) ? parsed.missingCriticalSkills : [],
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
        experienceEvaluation: parsed.experienceEvaluation || '',
        educationAlignment: parsed.educationAlignment || '',
        criticalGaps: Array.isArray(parsed.criticalGaps) ? parsed.criticalGaps : [],
        roleSuitability: parsed.roleSuitability || '',
        recommendation,
        matchedSkills: Array.isArray(parsed.topSkills) ? parsed.topSkills : [],
    };

    return report;
};