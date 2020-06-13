import ReportStatus from '../models/ReportStatus';
import CheckUserAnalyser from '../services/CheckUserAnalyser';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import Report from '../models/Report';

class ReportStatusController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      report_id: Yup.number().required(),
      description: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const cityId = await CheckUserAnalyser(req.userId || '-1');

    if (cityId === -1) return res.status(401).json({ error: 'Unautorized' });

    const reportStatusRepo = getRepository(ReportStatus);
    const reportRepo = getRepository(Report);
    const { report_id, description } = req.body;

    const report = await reportRepo.findOne({ id: report_id, city: cityId });

    if (!report) return res.status(404).json({ error: 'Report not found' });

    const newReportStatus = reportStatusRepo.create({
      report: report_id,
      description,
      user: parseInt(req.userId || '0'),
    });

    reportStatusRepo.save(newReportStatus);

    return res.json({ response: 'Status sucessfull created' });
  }
}

export default new ReportStatusController();
