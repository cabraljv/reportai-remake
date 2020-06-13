import { Request, Response } from 'express';
import * as Yup from 'yup';

import Report from '../models/Report';
import { getRepository } from 'typeorm';

class GeolocationController {
  async index(req: Request, res: Response) {
    const schema = Yup.object().shape({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query)))
      return res.status(400).json({ error: 'Invalid fields' });

    const { latitude, longitude } = req.query;

    const maxBound = 5; // 5km

    const reportRepository = getRepository(Report);

    const reports = await reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.category', 'category')
      .leftJoinAndSelect('report.status', 'status')
      .select([
        'report.id',
        'report.description',
        'report.img_path',
        'report.latitude',
        'report.longitude',
        'report.createdAt',
        'category.name',
        'category.icon_path',
        'status.description',
        'status.createdAt',
      ])
      .where(
        `(3959 * acos(cos(radians(${latitude})) * 
        cos(radians(report.latitude)) * cos(radians(${longitude}) 
        - radians(report.longitude)) + sin(radians(${latitude})) * 
        sin(radians(report.latitude))))<${maxBound}`
      )
      .getMany();

    return res.json(reports);
  }
}

export default new GeolocationController();
