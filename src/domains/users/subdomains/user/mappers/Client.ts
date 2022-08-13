import { Client } from '@domains/users/entities';
import { CreatedClientType } from '@interfaces/response';

export const modelClientToApi = ({
  uuid,
  createdAt,
  updatedAt,
}: Client): CreatedClientType => {
  return {
    id: uuid,
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

export const manyModelClientsToAPI = (
  clients: Client[],
): CreatedClientType[] => {
  return clients.map(client => modelClientToApi(client));
};
