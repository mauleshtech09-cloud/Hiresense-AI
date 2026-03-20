import { Request, Response } from 'express';
import { db } from '../models/memoryDb';

export const login = (req: Request, res: Response) => {
    const { email } = req.body;
    let user = db.findUserByEmail(email);
    if (!user) {
        user = { id: Math.random().toString(36).substr(2, 9), email, name: email.split('@')[0] };
        db.users.push(user);
    }
    const token = 'mock-jwt-token-' + user.id;
    res.json({ token, user });
};

export const register = (req: Request, res: Response) => {
    const { name, email, password, industry, location } = req.body;
    const user = { id: Math.random().toString(36).substr(2, 9), email, name, password, industry, location };
    db.users.push(user);
    db.organizations.push({
        id: 'org-' + user.id,
        name: name + ' Organization',
        plan: 'Basic',
        scanCount: 0,
        billingCycle: 'monthly'
    });
    res.json({ token: 'mock-jwt-token-' + user.id, user });
};
