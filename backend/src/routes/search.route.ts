import express from 'express';
import { searchHandler, searchUrlHandler } from '../controllers/search.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

// j'associe la route '/api/search' au controller searchHandler
router.get('/', authMiddleware, searchHandler as any);
router.get('/url', searchUrlHandler as any);

export default router;