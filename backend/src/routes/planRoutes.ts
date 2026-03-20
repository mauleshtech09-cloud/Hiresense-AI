import { Router } from 'express';
import { upgradePlan } from '../controllers/planController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.post('/upgrade', requireAuth, upgradePlan);
export default router;
