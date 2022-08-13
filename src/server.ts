import 'reflect-metadata';
import { environment } from '@config/enviroment';
import { GarageDataSource } from 'database/sources';
import { server } from './app';
import './routes';

// import helmet from "fastify-helmet";

// server.register(helmet);

const loadDatabase = async () => {
  try {
    await GarageDataSource.initialize();
    server.log.info(`🗄️ Started all Databases`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

server.listen(
  {
    port: Number.parseInt(environment.parsed?.PORT as any, 10),
    host: '0.0.0.0',
  },
  async err => {
    try {
      await loadDatabase();
      if (err) throw err;
    } catch (error) {
      server.log.error((error as Error).message);

      process.exit(1);
    }
  },
);
