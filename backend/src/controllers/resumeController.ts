import { Request, Response } from 'express';
import { generateReport } from '../services/matchEngineService';
import pdfParse from 'pdf-parse';

export const analyzeResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const jobRole = req.body.jobRole;
        const isReassess = req.body.isReassess === 'true';

        if (!file || !jobRole) {
            return res.status(400).json({ error: 'Missing file or jobRole' });
        }

        const pdfData = await (pdfParse as any)(file.buffer);
        const rawText = pdfData.text;

        const hasEducation = /(Education|Academic)/i.test(rawText);
        const hasSkills = /(Skills|Technologies)/i.test(rawText);

        if (!hasEducation || !hasSkills) {
            return res.status(400).json({ error: 'Invalid Resume Format: Missing mandatory sections (Educational Qualification or Skills). Please upload a professional document.' });
        }

        const report = generateReport(file.originalname, jobRole, isReassess, rawText);
        res.json(report);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
