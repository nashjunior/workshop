import { environment } from '@config/enviroment';
import { DataSource } from 'typeorm';

export const GarageDataSource = new DataSource({
  type: 'postgres',
  url: environment.parsed?.DATABASE_URL,
  migrations: [environment.parsed?.PATH_MIGRATIONS as string],
  entities: [environment.parsed?.PATH_ENTITIES as string],
});
