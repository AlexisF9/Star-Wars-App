import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateUser } from '../services/auth.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (validateUser(username, password)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid auth' });
};

export const getDashboard = (req: AuthenticatedRequest, res: Response) => {
  res.json({ username: req.user?.username });
};