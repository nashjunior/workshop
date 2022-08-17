import { Person } from '@domains/users/entities';
import {
  IClientRepositoty,
  IUserRepository,
} from '@domains/users/subdomains/user';
import { ICreateRequest } from '../../../../../../interfaces/requests';
import { GarageDataSource } from '../../../../../../database/sources';
import { autoInjectable, inject } from 'tsyringe';
import { CreatePerson } from './AbstractCreatePersons';

@autoInjectable()
export class CreateClientPerson extends CreatePerson {
  constructor(
    @inject('ClientTypeormRepository')
    public clientRepositoty: IClientRepositoty,

    @inject('UserTypeormRepository')
    public userTypeormRepository: IUserRepository,
  ) {
    super();
  }

  public async handle({
    user_type,
    ...rest
  }: ICreateRequest & { name: string; cpfCnpj: string } & {
    user_type: 0 | 1 | 2;
  }): Promise<Person | undefined> {
    if (user_type !== 2) {
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

      const client = await this.clientRepositoty.createOne(
        { idPerson: person.idPerson, createdBy: rest.createdBy },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return {
        ...person,
        client,
      };
    } catch (error) {
      console.error('client');

      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
