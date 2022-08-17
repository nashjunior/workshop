import { environment } from '@config/enviroment';
import { DataSource } from 'typeorm';

export const SeedsGarageDataSource = new DataSource({
  type: 'postgres',
  url: environment.parsed?.DATABASE_URL,
  migrations: ['src/database/seeds/*{.js,.ts}'],
  entities: [environment.parsed?.PATH_ENTITIES as string],
});
