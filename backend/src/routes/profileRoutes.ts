import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.get('/', requireAuth, getProfile);
router.post('/update', requireAuth, updateProfile);
export default router;
