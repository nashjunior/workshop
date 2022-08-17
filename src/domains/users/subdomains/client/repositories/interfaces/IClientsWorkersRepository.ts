import { ClientWorker } from '@domains/users/entities';

export interface IClientsWorkersRepository {
  findWorkersByIdClient(id: number): Promise<ClientWorker[]>;

  createMany(
    idsWorkers: number[],
    idClient: number,
    createdBy: string,
  ): Promise<ClientWorker[]>;
}
