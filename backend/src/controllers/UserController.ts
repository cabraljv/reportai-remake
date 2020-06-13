import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { hash } from 'bcryptjs';
class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string().required(),
      password: Yup.string().required().min(6),
      cpf: Yup.string().length(11),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const userRepo = getRepository(User);

    const { email, password, cpf, name } = req.body;

    const checkExists = await userRepo.findOne({ email });

    if (checkExists) return res.status(400).json({ error: 'Email in use' });
    const hashedPassword = await hash(password, 8);

    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      cpf,
    });

    await userRepo.save(user);
    return res.json({ response: 'User sussessful created' });
  }
}

export default new UserController();
