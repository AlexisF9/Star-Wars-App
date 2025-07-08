import { Request, Response } from 'express';
import { getCategory, getInfoElement } from '../services/swapi.service';

export const categoryHandler = async (req: Request, res: Response) => {
    // requête entrante
    const query = req.params.name as string;

    if (!query) {
      return res.status(400).json({ error: 'Missing query' });
    }

    try {
        const result = await getCategory(req.params.name);
        res.status(200).json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const infoElementHandler = async (req: Request, res: Response) => {
    // requête entrante
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