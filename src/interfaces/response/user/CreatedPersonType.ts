import { CreatedClientType } from './CreatedClientType';
import { CreatedWorkerType } from './CreatedWorkerType';

export type CreatedPersonType = {
  id: string;
  name: string;
  cpf_cnpj: string;
  created_at: Date;
  updated_at?: Date;
  worker?: CreatedWorkerType;
  client?: CreatedClientType;
};
