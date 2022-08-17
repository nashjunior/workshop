import { apm } from '@config/elastic';
import 'reflect-metadata';
import { server } from './app';
import { environment } from '@config/enviroment';
import { GarageDataSource } from '@database/sources';
import './routes';

// import helmet from "fastify-helmet";

// server.register(helmet);

const loadDatabase = async () => {
  try {
    await GarageDataSource.initialize();
    server.log.info(`🗄️ Started all Databases`);

    if (apm.isStarted()) {
      server.log.info(`Started APM monitor`);
      server.listen(
        {
          port: Number.parseInt(environment.parsed?.PORT as any, 10),
          host: '0.0.0.0',
        },
        async err => {
          if (err) throw err;
        },
      );
    } else {
      throw new Error('Apm not started');
    }
  } catch (error) {
    server.log.error((error as Error).message);

    process.exit(1);
  }
};

loadDatabase();
