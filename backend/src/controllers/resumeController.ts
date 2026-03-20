import { Request, Response } from 'express';
import { generateReport } from '../services/matchEngineService';

export const analyzeResume = (req: Request, res: Response) => {
    try {
        const file = req.file;
        const jobRole = req.body.jobRole;
        const isReassess = req.body.isReassess === 'true';

        if (!file || !jobRole) {
            return res.status(400).json({ error: 'Missing file or jobRole' });
        }

        const report = generateReport(file.originalname, jobRole, isReassess);
        res.json(report);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
