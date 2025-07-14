import { Request, Response } from 'express';
import { getInfoElementByUrl, searchInAll, searchSwapi } from '../services/swapi.service';

export const searchHandler = async (req: Request, res: Response) => {
  // requête entrante
  const category = req.query.category as string;
  const text = req.query.q as string;

  if (!text) {
    return res.status(400).json({ error: 'Missing search query (?q=)' });
  }

  try {
    if (category === "all") {
      // appel le service searchSwapi qui contient la logique d'appel à l'API SWAPI
      const results = await searchInAll(text)

      // réponse du service au format json
      res.status(200).json(results);
    } else {
      const results = await searchSwapi(category, text)
      res.status(200).json(results);
    }
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchUrlHandler = async (req: Request, res: Response) => {
  const url = req.query.q as string;

  if (!url) {
    return res.status(400).json({ error: 'Missing search query (?q=)' });
  }

  try {
    const results = await getInfoElementByUrl(url)
    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};