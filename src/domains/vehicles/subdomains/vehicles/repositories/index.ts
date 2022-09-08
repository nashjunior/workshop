import { dependecyContainer } from '../../../../../container';
import {
  IPartsSubVehicleRepository,
  IVehiclesPartsRepository,
  IVehiclesRepository,
} from './interfaces';
import {
  PartsSubVehicleTypeormRepository,
  VehiclesPartTypeormRepository,
  VehiclesTypeormRepository,
} from './typeorm';

export * from './interfaces';

dependecyContainer.register<IVehiclesRepository>('VehiclesTypeormRepository', {
  useValue: VehiclesTypeormRepository,
});

dependecyContainer.register<IVehiclesPartsRepository>(
  'VehiclesPartTypeormRepository',
  { useValue: VehiclesPartTypeormRepository },
);

dependecyContainer.register<IPartsSubVehicleRepository>(
  'PartsSubVehicleTypeormRepository',
  { useValue: PartsSubVehicleTypeormRepository },
);
