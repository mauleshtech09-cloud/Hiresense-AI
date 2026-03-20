import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // Simple mock auth check picking up a hardcoded header or just passing through
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Simulate decoding token to get user info
    (req as any).user = { id: 'u1', email: 'demo@hiresense.ai' };
    next();
};
