import express from 'express';
import { infoElementHandler } from '../controllers/category.controller';

const router = express.Router();

router.get('/:name/:id', infoElementHandler as any);

export default router;