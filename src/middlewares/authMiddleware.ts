import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    (req as any).user = decoded; // Add the user info to the request object
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}