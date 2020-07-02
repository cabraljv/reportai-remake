import { Router } from 'express';
import Multer from 'multer';

import uploadConfig from './config/upload';
import SessionController from './controllers/MobileSessionController';
import auth from './middlewares/auth';
import ReportController from './controllers/ReportController';
import GeolocationController from './controllers/GeolocationController';
import AnalyseReportController from './controllers/AnalyseReportController';
import CategoriesController from './controllers/CategoriesController';
import ReportStatusController from './controllers/ReportStatusController';
import AnalyseSessionController from './controllers/AnalyseSessionController';
import AnalyseDashboardController from './controllers/AnalyseDashboardController';

const uploads = Multer(uploadConfig);
const routes = Router();

routes.get('/', (req, res) => res.send('All services as running'));

routes.post('/session/mobile', SessionController.store);
routes.post('/session/analyse', AnalyseSessionController.store);

routes.use(auth);

routes.post('/report', uploads.single('image'), ReportController.store);
routes.delete('/report/:reportId', ReportController.destroy);
routes.get('/report/:reportId', ReportController.show);
routes.get('/report', ReportController.index);

routes.get('/geolocation', GeolocationController.index);

routes.get('/categories', CategoriesController.index);

routes.post('/status', ReportStatusController.store);

routes.get('/analyse/reports', AnalyseReportController.index);
routes.delete('/analyse/reports/:reportId', AnalyseReportController.destroy);
routes.get('/analyse/dashboard', AnalyseDashboardController.index);

export default routes;
