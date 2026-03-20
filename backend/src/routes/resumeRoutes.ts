import { Router } from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/resumeController';
import { requireAuth } from '../middleware/authMiddleware';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/analyze', requireAuth, upload.single('resume'), analyzeResume);
export default router;
