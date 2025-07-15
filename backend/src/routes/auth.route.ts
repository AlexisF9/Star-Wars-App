import express from 'express';
import { login, getDashboard } from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', login as any);
router.get('/dashboard', authMiddleware, getDashboard);

export default router;