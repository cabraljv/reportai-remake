import { Router } from 'express';
import Multer from 'multer';

import uploadConfig from './config/upload';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import auth from './middlewares/auth';
import ReportController from './controllers/ReportController';

const uploads = Multer(uploadConfig);
const routes = Router();

routes.get('/', (req, res) => res.send('All services as running'));

routes.post('/user', UserController.store);

routes.post('/session', SessionController.store);

routes.use(auth);

routes.post('/report', uploads.single('image'), ReportController.store);
routes.delete('/report/:reportId', ReportController.destroy);
routes.get('/report/:reportId', ReportController.show);
routes.get('/report', ReportController.index);

export default routes;
