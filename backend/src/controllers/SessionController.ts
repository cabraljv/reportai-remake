import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../config/auth';

class SessionController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const userRepo = getRepository(User);

    const { email, password } = req.body;

    const user = await userRepo.findOne({ email });

    if (!user) return res.status(401).json({ error: 'User not found' });
    if (!(await user.verifyPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!user.isConfirmed)
      return res.status(400).json({ error: 'User as not be confirmed' });
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
