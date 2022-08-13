import { Client } from '@domains/users/entities';
import { GarageDataSource } from '../../../../../../database/sources';
import { v4 as uuidV4 } from 'uuid';
import { QueryRunner } from 'typeorm';
import { CreateClientDTOType } from '../../dtos';
import { IClientRepositoty } from '../interfaces/IClientRepositoty';

export const ClientTypeormRepository = GarageDataSource.getRepository(
  Client,
).extend<IClientRepositoty>({
  async startTypeormTransaction(source) {
    const queryRunner = source.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  },

  async createOne(dto: CreateClientDTOType, queryRunner?: QueryRunner) {
    const instance = this.create({
      ...dto,
      uuid: uuidV4(),
    });

    return queryRunner
      ? queryRunner.manager.save(instance)
      : this.save(instance);
  },
});
