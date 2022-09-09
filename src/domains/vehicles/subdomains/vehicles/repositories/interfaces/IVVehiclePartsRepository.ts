import { VVehiclePart } from '@domains/vehicles/entites';
import { FindVVehiclePartsType } from './FindVVehiclePartsType';

export interface IVVehiclePartsRepository {
  findByIdVehicle(
    data: FindVVehiclePartsType & { id: string },
  ): Promise<[VVehiclePart[], number]>;
}
