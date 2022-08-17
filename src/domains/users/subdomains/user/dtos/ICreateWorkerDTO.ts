import { ICreateRequest } from '../../../../../interfaces/requests';

export type CreateWorkerDTOType = ICreateRequest & {
  idPerson: number;
};
