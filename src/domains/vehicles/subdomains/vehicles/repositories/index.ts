import { dependecyContainer } from '../../../../../container';
import {
  IPartsSubVehicleRepository,
  IVehiclesPartsRepository,
  IVehiclesRepository,
  IVVehiclePartsRepository,
} from './interfaces';
import {
  PartsSubVehicleTypeormRepository,
  VehiclesPartTypeormRepository,
  VehiclesTypeormRepository,
  VVehiclePartsTypeormRepository,
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

dependecyContainer.register<IVVehiclePartsRepository>(
  'VVehiclePartsTypeormRepository',
  { useValue: VVehiclePartsTypeormRepository },
);
