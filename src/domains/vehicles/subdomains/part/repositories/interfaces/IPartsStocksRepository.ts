import { PartStock } from '@domains/vehicles/entites';
import { ICreatePartStockDTOType } from '../../dtos';

export interface IPartsStocksRepository {
  createOne(dto: ICreatePartStockDTOType): Promise<PartStock>;
}
