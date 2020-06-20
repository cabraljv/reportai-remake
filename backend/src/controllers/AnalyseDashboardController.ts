import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import CheckUserAnalyser from '../services/CheckUserAnalyser';
import Report from '../models/Report';
interface ITotalCategory {
  name: string;
  reports: string;
}
class AnalyseDashboardController {
  async index(req: Request, res: Response) {
    const cityId = await CheckUserAnalyser(req.userId || '-1');

    if (cityId === -1) {
      return res.status(401).json({ error: 'Unautorized' });
    }

    const reportRepository = getRepository(Report);

    const reports = await reportRepository.query(`SELECT    CONCAT(
      DATE_PART('day', created_at),'/',
      DATE_PART('month', created_at),'/',
      DATE_PART('year', created_at)) as "date",
      COUNT(*) AS "reports"
FROM      reports
WHERE city_id=${cityId} and deleted_at IS NULL
GROUP BY  DATE_PART('day', created_at),
      DATE_PART('month', created_at),
      DATE_PART('year', created_at)`);

    const finished = await reportRepository
      .createQueryBuilder('reports')
      .leftJoinAndSelect('reports.status', 'status')
      .where('status.status_code=2', { city: cityId })
      .getCount();

    const total_reports = await reportRepository
      .createQueryBuilder('reports')
      .where({ city: cityId })
      .getCount();

    const total_categories: ITotalCategory[] = await reportRepository.query(`SELECT category.name,
      NULLIF(report.num_reports, 0) AS reports
      from report_categories category
      LEFT OUTER JOIN
        (SELECT category_id, COUNT(category_id) AS num_reports
         from reports where reports.city_id=${cityId} and reports.deleted_at IS NULL
         group by category_id) report ON category.id = report.category_id`);

    const newTotalCategories = total_categories.map((item) => ({
      name: item.name,
      reports: parseInt(item.reports),
    }));
    return res.json({
      reports_per_day: reports,
      total_reports,
      reports_finished: finished,
      total_categories: newTotalCategories,
    });
  }
}

export default new AnalyseDashboardController();
