import { Worker } from '@domains/users/entities';
import { CreatedWorkerType } from '@interfaces/response';

export const modelWorkerToApi = ({
  createdAt,
  updatedAt,
  id,
}: Worker): CreatedWorkerType => {
  return {
    id,
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

export const manyModelWorkersToAPI = (
  clients: Worker[],
): CreatedWorkerType[] => {
  return clients.map(client => modelWorkerToApi(client));
};
