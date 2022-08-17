import { environment } from '@config/enviroment';
import { DataSource } from 'typeorm';
import { entities as usersEntities } from '@domains/users/entities';
import { entities as entitiesVehicles } from '@domains/vehicles/entites';

export const GarageDataSource = new DataSource({
  type: 'postgres',
  url: environment.parsed?.DATABASE_URL,
  migrations: [environment.parsed?.PATH_MIGRATIONS as string],
  entities: [...usersEntities, ...entitiesVehicles],
  logging: true,
});
