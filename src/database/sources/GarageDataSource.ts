import { environment } from '@config/enviroment';
import { DataSource } from 'typeorm';
import * as usersEntities from '@domains/users/entities';
import * as vehicleEntities from '@domains/vehicles/entites';

export const GarageDataSource = new DataSource({
  type: 'postgres',
  url: environment.parsed?.DATABASE_URL,
  migrations: [environment.parsed?.PATH_MIGRATIONS as string],
  entities: [
    ...Object.values(usersEntities),
    ...Object.values(vehicleEntities),
  ],
});
