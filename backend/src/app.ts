import 'dotenv/config';
import 'reflect-metadata';
import express, { Express } from 'express';
import routes from './routes';
import './database';

class App {
  server: Express;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App();
