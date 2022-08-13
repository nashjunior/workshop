import { Worker } from '@domains/users/entities';
import { GarageDataSource } from 'database/sources';
import { In } from 'typeorm';
import { IWokersRepository } from '../interfaces/IWorkersRepository';

export const WorkersTypeormRepository = GarageDataSource.getRepository(
  Worker,
).extend<IWokersRepository>({
  findByIds(ids) {
    return this.find({ where: { id: In(ids) } });
  },
});
