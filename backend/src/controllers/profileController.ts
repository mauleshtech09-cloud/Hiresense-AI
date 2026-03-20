import { Request, Response } from 'express';
import { db } from '../models/memoryDb';

export const getProfile = (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const user = db.users.find(u => u.id === userId);
    res.json(user || {});
};

export const updateProfile = (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        db.users[userIndex] = { ...db.users[userIndex], ...req.body };
        res.json(db.users[userIndex]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};
