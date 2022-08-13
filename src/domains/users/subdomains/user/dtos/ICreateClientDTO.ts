import { ICreateRequest } from '@interfaces/requests';

export type CreateClientDTOType = ICreateRequest & {
  idPerson: number;
};
