import { ICreateRequest } from '../../../../../interfaces/requests';

export type ICreatePartStockDTOType = ICreateRequest & {
  idPart: number;
  amount: number;
  unitValue: number;
  defaultSellingPrice: number;
};
