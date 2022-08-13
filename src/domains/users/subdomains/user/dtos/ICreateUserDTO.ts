import { ICreateRequest } from '@interfaces/requests';

export type CreateUserDTOType = ICreateRequest & {
  name: string;
  cpfCnpj: string;
};
