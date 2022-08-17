import { Person } from '@domains/users/entities';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateUserDTOType } from '../../dtos';

export interface IUserRepository {
  createOne(dto: CreateUserDTOType, queryRunner?: QueryRunner): Promise<Person>;

  startTypeormTransaction(source: DataSource): Promise<QueryRunner>;
}
