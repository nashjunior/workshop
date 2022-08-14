import { ClientWorker } from '@domains/users/entities';
import { CreatedClientWorkerType } from '../../../../../interfaces/response';

export const modelClientWorkerToApi = ({
  id,
  createdAt,
  updatedAt,
  worker: { id: uuidWorker },
  client: { id: uuidClient },
}: ClientWorker): CreatedClientWorkerType => {
  return {
    id,
    id_client: uuidClient.trim(),
    id_worker: uuidWorker.trim(),
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

export const manyModelClientWorkersToAPI = (
  clients: ClientWorker[],
): CreatedClientWorkerType[] => {
  return clients.map(client => modelClientWorkerToApi(client));
};
