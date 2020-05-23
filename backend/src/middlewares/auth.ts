import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token as not provided' });
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return next();
};
