import { Vehicle } from '@domains/vehicles/entites';
import { CreateVehicleDTOType } from '../../dto/ICreateVehicleDTO';
import { FindVehiclesType } from './FindVehiclesType';

export interface IVehiclesRepository {
  createOne(dto: CreateVehicleDTOType): Promise<Vehicle>;

  findByUUID(id: string): Promise<Vehicle>;

  find(options: FindVehiclesType): Promise<[Vehicle[], number]>;
}
