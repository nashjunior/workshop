import { Worker } from '@domains/users/entities';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateWorkerDTOType } from '../../dtos/ICreateWorkerDTO';

export interface IWorkerRepository {
  createOne(
    dto: CreateWorkerDTOType,
    queryRunner?: QueryRunner,
  ): Promise<Worker>;

  startTypeormTransaction(source: DataSource): Promise<QueryRunner>;
}
