import { VehiclePart } from '@domains/vehicles/entites';
import { CreateVehiclePartDTOType } from '../../dto/ICreateVehiclePartDTO';

export interface IVehiclesPartsRepository {
  createMany: (
    idVehicle: number,
    dtos: CreateVehiclePartDTOType[],
  ) => Promise<VehiclePart[]>;
}
