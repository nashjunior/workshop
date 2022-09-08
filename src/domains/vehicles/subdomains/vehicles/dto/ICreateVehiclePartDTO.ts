import { ICreateRequest } from '../../../../../interfaces/requests';

export type CreateVehiclePartDTOType = ICreateRequest & {
  idPart: number;
};
