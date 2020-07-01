import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import CheckUserAnalyser from '../services/CheckUserAnalyser';
import User from '../models/User';
import Report from '../models/Report';

class AnalyseReportController {
  async index(req: Request, res: Response) {
    const cityId = await CheckUserAnalyser(req.userId || '-1');

    if (cityId === -1) {
      return res.status(401).json({ error: 'Unautorized' });
    }

    const reportRepository = getRepository(Report);

    const reports = await reportRepository
      .createQueryBuilder('report')
      .where({ city: cityId })
      .leftJoinAndSelect('report.city', 'city')
      .leftJoinAndSelect('report.category', 'category')
      .leftJoinAndSelect('report.user', 'user')
      .leftJoinAndSelect('report.status', 'status')
      .select([
        'report.id',
        'report.description',
        'report.img_path',
        'report.latitude',
        'report.created_at',
        'report.longitude',
        'category.id',
        'category.name',
        'category.icon_path',
        'user.id',
        'user.name',
        'status.description',
        'status.created_at',
        'status.status_code',
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

    report.deleted_at = new Date();
    report.deleted_by = user;

    await reportRepository.save(report);

    return res.json({ response: 'Report sussessful deleted' });
  }
}

export default new AnalyseReportController();
