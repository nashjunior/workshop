import { ICreateRequest } from '../../../../../interfaces/requests';

export type ICreatePartDTOType = ICreateRequest & {
  name: string;
  description?: string;
};
