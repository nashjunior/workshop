import { Person } from '@domains/users/entities';
import { GarageDataSource } from '../../../../../../database/sources';
import { CreateUserDTOType } from '../../dtos';
import { IUserRepository } from '../';
import { v4 as uuidV4 } from 'uuid';
import { QueryRunner } from 'typeorm';

export const UserTypeormRepository = GarageDataSource.getRepository(
  Person,
).extend<IUserRepository>({
  async startTypeormTransaction(source) {
    const queryRunner = source.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  },

  async createOne(dto: CreateUserDTOType, queryRunner?: QueryRunner) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return queryRunner
      ? queryRunner.manager.save(instance)
      : this.save(instance);
  },
});
