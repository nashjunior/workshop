import { ICreateRequest } from '../../../../../interfaces/requests';

export type CreateVehicleDTOType = ICreateRequest & {
  idModel: number;
  fabricationYear: number;
  modelYear?: number;
  description?: string;
};
