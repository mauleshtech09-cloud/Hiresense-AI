// utils/geminiAnalyzer.ts
import type { CandidateReport, CandidateScore } from '../context/AppStateContext';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (resumeText: string): string => `
ROLE: Lead Systems Auditor & Data Extraction Architect
OBJECTIVE: Zero-Bias Dynamic Resume Analysis (Fixing Default Software/MS Office Bias)

CRITICAL: Disable all default templates. Do not assume 'Software Development'. Do not assume 'MS Office'. You must perform a 'Blank Slate' extraction. If the resume is for a Nurse, the report must reflect Healthcare. If it is for a Welder, it must reflect Manufacturing.

1. DYNAMIC CONTEXT DISCOVERY (Step 1)
Before generating the report, answer these 3 internal check-points based ONLY on the uploaded file:
Primary Industry: [Identify from Resume text]
Target Job Title: [Identify from Resume Summary/Experience]
Core Technical Stack: [List the top 5 skills actually written in the file]

2. THE 10-SECTION CROSS-REFERENCED REPORT (Step 2)
Generate a JSON object with numbered string keys "1" through "10" containing the following structures:

{
  "1": { "dynamic_industry": "Primary Industry", "name": "Name", "contact": "Contact", "dynamic_title": "Target Job Title" },
  "2": "Markdown string evaluating Degree and Institution Relevance to the Extracted Industry.",
  "3": "Markdown table mapping Actual Skills vs Required Skills (for the Extracted Industry). Mark missing as gaps.",
  "4": "Markdown string calculating total years in the Extracted Industry and identifying Seniority.",
  "5": "Markdown string benchmark of Salary Expectation based on Extracted Title and Location.",
  "6": "Markdown string of Current City/State and Relocation/Remote preferences.",
  "7": "Markdown string mapping 2-3 specific projects to skills (must match Extracted Industry context).",
  "8": { "domain": number, "skills": number, "experience": number, "education": number, "certs": number, "support": number, "total_score": number },
  "9": { "status": "SELECTED | WAITLISTED | REJECTED", "justification": "Logic based on Total Score." },
  "10": ["q1", "q2", "q3", "q4", "q5"]
}

STRICT INSTRUCTION: Return ONLY valid JSON matching exactly the keys "1" through "10". Do not wrap in markdown tags.

Resume Text:
"""
${resumeText}
"""
`.trim();

const fetchWithRetry = async (url: string, options: any, retries = 3, delay = 15000): Promise<Response> => {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
        console.warn('Quota exceeded. Retrying in ' + (delay / 1000) + 's...');
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 1.5);
    }
    return response;
};

export const analyzeResumeWithGemini = async (resumeText: string, jobRole: string, fileName: string): Promise<CandidateReport> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in your .env file.');

    const prompt = buildPrompt(resumeText);

    const response = await fetchWithRetry(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 2048, responseMimeType: "application/json" },
        }),
    });

    if (!response.ok) {
        const errBody = await response.text().catch(() => '');
        throw new Error('API Request Failed: ' + errBody.slice(0, 100));
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    let parsed: any;
    try { parsed = JSON.parse(rawText); } catch { parsed = {}; }

    const evalData = parsed["8"] || {};
    const totalScore = Math.min(100, Math.max(0, Number(evalData.total_score) || 0));

    const scoreBreakdown: CandidateScore = {
        total: totalScore,
        domainRelevance: evalData.domain || 0,
        skillMatch: evalData.skills || 0,
        experienceMatch: evalData.experience || 0,
        educationMatch: evalData.education || 0,
        certifications: evalData.certs || 0,
        supportingSkills: evalData.support || 0,
    };

    const statusMatch = parsed["9"]?.status || 'REJECTED';
    const recommendation = statusMatch === 'SELECTED' ? 'Highly Suitable' 
        : statusMatch === 'WAITLISTED' ? 'Moderately Suitable' 
        : 'Not Suitable';

    const report: CandidateReport = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        candidateName: parsed["1"]?.name || fileName.replace(/\.pdf$/i, ''),
        jobRole: parsed["1"]?.dynamic_title || jobRole,
        score: totalScore,
        scoreBreakdown,
        candidateDomain: parsed["1"]?.dynamic_industry || 'Unknown',
        jobDomain: parsed["1"]?.dynamic_industry || jobRole,
        domainMatchStatus: totalScore > 75 ? 'Match' : 'Mismatch',
        topSkills: [],
        missingCriticalSkills: [],
        strengths: [],
        weaknesses: [],
        experienceEvaluation: parsed["4"] || '',
        educationAlignment: parsed["2"] || '',
        criticalGaps: [],
        roleSuitability: parsed["9"]?.justification || '',
        recommendation,
        matchedSkills: [],
        masterAnalysis: parsed
    };

    return report;
};