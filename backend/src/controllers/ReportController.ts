import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Report from '../models/Report';
import City from '../models/SupportedCities';
import * as Yup from 'yup';
import Axios from 'axios';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import ReportStatus from '../models/ReportStatus';

class ReportControler {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      description: Yup.string().required().min(10),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      category: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const { category, description, latitude, longitude } = req.body;

    let city_name = '';
    try {
      const response = await Axios.get(
        `http://open.mapquestapi.com/geocoding/v1/reverse?key=${process.env.GEOCODE_KEY}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );

      city_name = response.data.results[0].locations[0].adminArea5;
    } catch (error) {}
    const reportRepo = getRepository(Report);
    const cityRepo = getRepository(City);

    const city = await cityRepo.findOne({ name: city_name });

    if (!city)
      return res.status(400).json({ error: 'This city is not supported' });

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', req.file.filename));

    fs.unlinkSync(req.file.path);

    const report = reportRepo.create({
      category,
      user: parseInt(req.userId || '0'),
      city,
      description,
      img_path: process.env.APP_URL + '/files/resized/' + req.file.filename,
      latitude,
      longitude,
    });
    await reportRepo.save(report);

    const reportStatusRepo = getRepository(ReportStatus);
    const newReportStatus = reportStatusRepo.create({
      user: parseInt(req.userId || '0'),
      description: 'EM ANÁLISE',
      report: report.id,
    });

    reportStatusRepo.save(newReportStatus);

    return res.status(201).json({ response: 'Report sussessful created' });
  }

  async show(req: Request, res: Response) {
    const schema = Yup.object().shape({
      reportId: Yup.string().required(),
    });
    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Invalid fields' });

    const { reportId } = req.params;

    const reportRepo = getRepository(Report);
    const reports = await reportRepo.findOne(reportId, {
      select: ['description', 'img_path', 'created_at'],
    });
    return res.json(reports);
  }

  async destroy(req: Request, res: Response) {
    const schema = Yup.object().shape({
      reportId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Invalid fields' });

    const { reportId } = req.params;

    const reportRepo = getRepository(Report);

    const report = await reportRepo.findOne({
      where: { id: reportId, user: req.userId },
      select: ['id'],
    });

    if (!report) return res.status(404).json({ error: 'Report not found' });
    report.deleted_at = new Date();
    report.deleted_by = parseInt(req.userId || '0');
    await reportRepo.save(report);

    return res.json('Report sussessful deleted');
  }
  async index(req: Request, res: Response) {
    const reportRepo = getRepository(Report);
    const reports = await reportRepo
      .createQueryBuilder('report')
      .where({ user: req.userId })
      .leftJoinAndSelect('report.category', 'category')
      .leftJoinAndSelect('report.status', 'status')
      .select([
        'report.id',
        'report.img_path',
        'report.created_at',
        'report.description',
        'category.name',
        'status.description',
        'status.created_at',
        'status.description',
        'status.created_at',
      ])
      .getMany();
    return res.json(reports);
  }
}

export default new ReportControler();
