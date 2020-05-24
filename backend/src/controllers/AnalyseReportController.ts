import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import Report from '../models/Report';

class AnalyseReportController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      relations: ['city_analyser'],
      where: { id: req.userId },
    });

    if (!user?.city_analyser)
      return res.status(401).json({ error: 'User as not a city analyser' });

    const reportRepository = getRepository(Report);

    const reports = await reportRepository
      .createQueryBuilder('report')
      .where({ city: user.city_analyser.id })
      .leftJoinAndSelect('report.city', 'city')
      .leftJoinAndSelect('report.category', 'category')
      .leftJoinAndSelect('report.user', 'user')
      .select([
        'report.id',
        'report.description',
        'report.img_path',
        'category.name',
        'user.id',
        'user.name',
      ])
      .getMany();

    return res.json(reports);
  }
  async destroy(req: Request, res: Response) {
    const schema = Yup.object().shape({
      reportId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Invalid fields' });

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      relations: ['city_analyser'],
      where: { id: req.userId },
    });

    if (!user?.city_analyser)
      return res.status(401).json({ error: 'User as not a city analyser' });

    const reportRepository = getRepository(Report);

    const { reportId } = req.params;

    const report = await reportRepository.findOne(reportId);

    if (!report) return res.status(404).json({ error: 'Report not found' });

    report.deletedAt = new Date();
    report.deletedBy = user;

    await reportRepository.save(report);

    return res.json({ response: 'Report sussessful deleted' });
  }
}

export default new AnalyseReportController();
