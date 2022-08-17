import { Client } from '@domains/users/entities';

export interface IClientsRepository {
  findById(id: string): Promise<Client>;
}
