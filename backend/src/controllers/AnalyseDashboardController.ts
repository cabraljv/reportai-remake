import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import CheckUserAnalyser from '../services/CheckUserAnalyser';
import Report from '../models/Report';

class AnalyseDashboardController {
  async index(req: Request, res: Response) {
    const cityId = await CheckUserAnalyser(req.userId || '-1');

    if (cityId === -1) {
      return res.status(401).json({ error: 'Unautorized' });
    }

    const reportRepository = getRepository(Report);
    const query = `SELECT    CONCAT(
      DATE_PART('day', created_at),'/',
      DATE_PART('month', created_at),'/',
      DATE_PART('year', created_at)) as "date",
      COUNT(*) AS "reports"
FROM      reports
WHERE city_id=${cityId}
GROUP BY  DATE_PART('day', created_at),
      DATE_PART('month', created_at),
      DATE_PART('year', created_at)`;
    const reports = await reportRepository.query(query);

    const finished = await reportRepository
      .createQueryBuilder('reports')
      .leftJoinAndSelect('reports.status', 'status')
      .where('status.status_code=2', { city: cityId })
      .getCount();

    const total_reports = await reportRepository
      .createQueryBuilder('reports')
      .where({ city: cityId })
      .getCount();

    return res.json({
      reports_per_day: reports,
      total_reports,
      reports_finished: finished,
    });
  }
}

export default new AnalyseDashboardController();
