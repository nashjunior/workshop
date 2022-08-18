import { Model } from '@domains/vehicles/entites';
import { ICreateModelDTOType } from '../../dtos';

export interface IModelsRepository {
  createOne(dto: ICreateModelDTOType): Promise<Model>;
}
