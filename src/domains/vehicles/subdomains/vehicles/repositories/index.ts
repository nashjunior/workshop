import { dependecyContainer } from '../../../../../container';
import { IVehiclesRepository } from './interfaces';
import { VehiclesTypeormRepository } from './typeorm';

export * from './interfaces';

dependecyContainer.register<IVehiclesRepository>('VehiclesTypeormRepository', {
  useValue: VehiclesTypeormRepository,
});
