import { Part } from '@domains/vehicles/entites';

export interface IPartsSubVehicleRepository {
  findMany(ids: string[]): Promise<Part[]>;
}
