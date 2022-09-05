import { ICreateRequest } from '../../../../../interfaces/requests';

export type ICreatePartPhotoDTOType = ICreateRequest & {
  idPart: number;
  url: string;
};
