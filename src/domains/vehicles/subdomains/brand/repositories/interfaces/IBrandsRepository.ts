import { Brand } from '@domains/vehicles/entites';
import { CreateBrandDTOType } from '../../dtos';
import { FindBrandsType } from './FindBrandsType';

export interface IBrandsRepository {
  find(options: FindBrandsType): Promise<[Brand[], number]>;

  findByName(name: string): Promise<Brand | null>;
  createOne(dto: CreateBrandDTOType): Promise<Brand>;

  findByUUID(id: string): Promise<Brand>;
}
