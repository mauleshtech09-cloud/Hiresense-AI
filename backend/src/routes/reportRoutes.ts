import { Router } from 'express';
import { saveReport, getHistory } from '../controllers/reportController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.post('/save', requireAuth, saveReport);
router.get('/history', requireAuth, getHistory);
export default router;
