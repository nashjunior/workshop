import { Person } from '@domains/users/entities';
import {
  IUserRepository,
  IWorkerRepository,
} from '@domains/users/subdomains/user';
import { ICreateRequest } from '@interfaces/requests';
import { GarageDataSource } from '../../../../../../database/sources';
import { inject, injectable } from 'tsyringe';
import { CreatePerson } from './AbstractCreatePersons';

@injectable()
export class CreateWorkerPerson extends CreatePerson {
  constructor(
    @inject('UserTypeormRepository')
    public userTypeormRepository: IUserRepository,

    @inject('WorkerTypeormRepository')
    protected workerRepository: IWorkerRepository,
  ) {
    super();
  }

  public async handle({
    user_type,
    ...rest
  }: ICreateRequest & { name: string; cpfCnpj: string } & {
    user_type: 0 | 1 | 2;
  }): Promise<Person | undefined> {
    if (user_type !== 1) {
      return super.handle({ user_type, ...rest });
    }

    const queryRunner =
      await this.userTypeormRepository.startTypeormTransaction(
        GarageDataSource,
      );

    try {
      const person = await this.userTypeormRepository.createOne(
        rest,
        queryRunner,
      );

      const worker = await this.workerRepository.createOne(
        { idPerson: person.idPerson, criado_por: rest.criado_por },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return {
        ...person,
        worker,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
