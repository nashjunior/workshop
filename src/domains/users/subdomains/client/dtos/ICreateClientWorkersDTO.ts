import { ICreateRequest } from '../../../../../interfaces/requests';

export type CreateClientWorkersDTOType = ICreateRequest & {
  idClient: string;
  idsWorkers: string[];
};
