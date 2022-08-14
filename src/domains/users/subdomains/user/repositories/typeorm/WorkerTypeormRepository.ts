import { Worker } from '@domains/users/entities';
import { GarageDataSource } from '../../../../../../database/sources';
import { IWorkerRepository } from '../index';
import { v4 as uuidV4 } from 'uuid';
import { QueryRunner } from 'typeorm';
import { CreateWorkerDTOType } from '../../dtos';

export const WorkerTypeormRepository = GarageDataSource.getRepository(
  Worker,
).extend<IWorkerRepository>({
  async startTypeormTransaction(source) {
    const queryRunner = source.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  },

  async createOne(dto: CreateWorkerDTOType, queryRunner?: QueryRunner) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return queryRunner
      ? queryRunner.manager.save(instance)
      : this.save(instance);
  },
});
