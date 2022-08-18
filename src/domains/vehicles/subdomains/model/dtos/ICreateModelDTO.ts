import { ICreateRequest } from '../../../../../interfaces/requests';

export type ICreateModelDTOType = ICreateRequest & {
  name: string;
  idBrand: number;
  createdBy: string;
};
