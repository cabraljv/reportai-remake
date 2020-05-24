import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Report from '../models/Report';
import City from '../models/SupportedCities';
import * as Yup from 'yup';
import Axios from 'axios';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

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
      user: req.userId || 0,
      city,
      description,
      img_path: process.env.FILE_STORAGE + 'resized/' + req.file.filename,
      latitude,
      longitude,
    });
    await reportRepo.save(report);

    return res.status(201).json({ response: 'User sussessful created' });
  }

  async index(req: Request, res: Response) {
    const reportRepo = getRepository(Report);
    const reports = await reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.user', 'user')
      .select(['report.description', 'user.email'])
      .getMany();
    return res.json(reports);
  }
}

export default new ReportControler();
