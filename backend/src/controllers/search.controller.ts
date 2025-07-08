import { Request, Response } from 'express';
import { searchSwapi } from '../services/swapi.service';

export const searchHandler = async (req: Request, res: Response) => {
  // requête entrante
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query (?q=)' });
  }

  try {
    // apple le service searchSwapi qui contient la logique d'appel à l'API SWAPI
    const results = await searchSwapi(query);

    // réponse du service au format json
    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
