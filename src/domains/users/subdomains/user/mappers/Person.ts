import { Person } from '@domains/users/entities';
import { CreatedPersonType } from '@interfaces/response';
import { modelClientToApi } from './Client';
import { modelWorkerToApi } from './Worker';

export const modelPersonToApi = ({
  uuidUser,
  cpfCnpj,
  createdAt,
  name,
  updatedAt,
  client,
  worker,
}: Person): CreatedPersonType => {
  return {
    id: uuidUser,
    name,
    cpf_cnpj: cpfCnpj,
    created_at: createdAt,
    updated_at: updatedAt,
    client: client ? modelClientToApi(client) : undefined,
    worker: worker ? modelWorkerToApi(worker) : undefined,
  };
};

export const manyModelPersonsToAPI = (
  persons: Person[],
): CreatedPersonType[] => {
  return persons.map(client => modelPersonToApi(client));
};
