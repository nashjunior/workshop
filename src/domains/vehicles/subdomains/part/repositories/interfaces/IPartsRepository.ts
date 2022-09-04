import { Part } from '@domains/vehicles/entites/Part';
import { ICreatePartDTOType } from '../../dtos';

export interface IPartsRepository {
  createOne(dto: ICreatePartDTOType): Promise<Part>;
  findByUUID(id: string): Promise<Part>;
}
