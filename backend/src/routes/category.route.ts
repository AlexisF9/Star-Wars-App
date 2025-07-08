import express from 'express';
import { categoryHandler, infoElementHandler } from '../controllers/category.controller';

const router = express.Router();

// j'associe la route '/api/search' au controller searchHandler
router.get('/:name', categoryHandler as any);
router.get('/:name/:id', infoElementHandler as any);

export default router;