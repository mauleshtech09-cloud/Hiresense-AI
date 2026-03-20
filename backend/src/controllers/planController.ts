import { Request, Response } from 'express';
import { db } from '../models/memoryDb';

export const upgradePlan = (req: Request, res: Response) => {
    const { plan, billingCycle } = req.body;
    // For mock, just grab the first org or the user's org
    if (db.organizations.length > 0) {
        db.organizations[0].plan = plan;
        db.organizations[0].billingCycle = billingCycle;
    }
    res.json({ message: 'Plan upgraded successfully', org: db.organizations[0] });
};
