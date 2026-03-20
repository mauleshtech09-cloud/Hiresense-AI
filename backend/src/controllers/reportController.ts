import { Request, Response } from 'express';
import { db } from '../models/memoryDb';

export const saveReport = (req: Request, res: Response) => {
    const report = req.body;
    db.reports.push(report);
    res.json({ message: 'Report saved', report });
};

export const getHistory = (req: Request, res: Response) => {
    res.json(db.reports);
};
