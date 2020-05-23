import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const routes = Router();

routes.get('/', (req, res) => res.send('All services as running'));

routes.post('/user', UserController.store);

routes.post('/session', SessionController.store);

export default routes;
