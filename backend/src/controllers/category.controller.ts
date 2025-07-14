import { Request, Response } from 'express';
import { getAllCategories, getAllElementsOfCategory, getInfoElement } from '../services/swapi.service';

export const categoryHandler = async (req: Request, res: Response) => {
    const params = req.params as { name: string };

    if (!params) {
      return res.status(400).json({ error: 'Missing query' });
    }

    try {
        const result = await getAllElementsOfCategory(params.name);
        res.status(200).json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const infoElementHandler = async (req: Request, res: Response) => {
    const params = req.params as { name: string, id: string };

    if (!params) {
      return res.status(400).json({ error: 'Missing query' });
    }

    try {
        const result = await getInfoElement(params);
        res.status(200).json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const categoriesHandler = async (req: Request, res: Response) => {
    const params = req.params as { name: string, id: string };

    if (!params) {
      return res.status(400).json({ error: 'Missing query' });
    }

    try {
        const result = await getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};