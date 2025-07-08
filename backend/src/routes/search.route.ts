import express from 'express';
import { searchHandler } from '../controllers/search.controller';

const router = express.Router();

// j'associe la route '/api/search' au controller searchHandler
router.get('/', searchHandler as any);

export default router;