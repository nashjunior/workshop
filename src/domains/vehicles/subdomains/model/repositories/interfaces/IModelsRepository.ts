import { Model } from '@domains/vehicles/entites';
import { ICreateModelDTOType } from '../../dtos';
import { FindModelsType } from './FindModelsType';

export interface IModelsRepository {
  createOne(dto: ICreateModelDTOType): Promise<Model>;

  findByUUID(id: string): Promise<Model>;

  find(options: FindModelsType): Promise<[Model[], number]>;
}
