import { Brand } from '@domains/vehicles/entites';
import { CreateBrandDTOType } from '../../dtos';

export interface IBrandsRepository {
  findByName(name: string): Promise<Brand | null>;
  createOne(dto: CreateBrandDTOType): Promise<Brand>;

  findByUUID(id: string): Promise<Brand>;
}
