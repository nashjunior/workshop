import { Client } from '@domains/users/entities';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateClientDTOType } from '../../dtos';

export interface IClientRepositoty {
  createOne(
    dto: CreateClientDTOType,
    queryRunner?: QueryRunner,
  ): Promise<Client>;

  startTypeormTransaction(source: DataSource): Promise<QueryRunner>;
}
