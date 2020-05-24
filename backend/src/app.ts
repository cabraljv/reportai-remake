import 'dotenv/config';
import 'reflect-metadata';
import express, { Express } from 'express';
import routes from './routes';
import './database';
import path from 'path';

class App {
  server: Express;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App();
