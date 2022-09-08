import { Part } from '@domains/vehicles/entites/Part';
import { ICreatePartDTOType } from '../../dtos';
import { FindPartsType } from './FindPartsType';

export interface IPartsRepository {
  createOne(dto: ICreatePartDTOType): Promise<Part>;
  findByUUID(id: string): Promise<Part>;

  find(options: FindPartsType): Promise<[Part[], number]>;
}
