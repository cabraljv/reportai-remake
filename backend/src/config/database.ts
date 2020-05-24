import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  synchronize: false,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/models/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations/',
    entitiesDir: 'src/models/',
  },
  migrations: ['build/database/migrations/*.js'],
};

export = config;
