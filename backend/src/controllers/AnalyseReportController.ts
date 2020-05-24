import { Response, Request } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';

class AnalyseReportController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    console.log(req.userId);
    const user = await userRepository.findOne({ where: { id: req.userId } });

    return res.json(user);
  }
}

export default new AnalyseReportController();
