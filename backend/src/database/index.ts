import { createConnection } from 'typeorm';
import config from '../config/database';

class Database {
  constructor() {
    this.initPostgres();
  }
  async initPostgres() {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
  }
}

export default new Database();
