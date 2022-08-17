import { Worker } from '@domains/users/entities';

export interface IWokersRepository {
  findByIds(ids: string[]): Promise<Worker[]>;
}
