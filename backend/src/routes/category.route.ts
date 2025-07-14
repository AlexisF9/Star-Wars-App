import express from 'express';
import { categoriesHandler, categoryHandler, infoElementHandler } from '../controllers/category.controller';

const router = express.Router();

router.get('/all', categoriesHandler as any);
router.get('/:name', categoryHandler as any);
router.get('/:name/:id', infoElementHandler as any);

export default router;