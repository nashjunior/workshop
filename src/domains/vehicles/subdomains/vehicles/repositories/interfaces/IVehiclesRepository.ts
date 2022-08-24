import { Vehicle } from '@domains/vehicles/entites';
import { CreateVehicleDTOType } from '../../dto/ICreateVehicleDTO';

export interface IVehiclesRepository {
  createOne(dto: CreateVehicleDTOType): Promise<Vehicle>;

  findByUUID(id: string): Promise<Vehicle>;
}
