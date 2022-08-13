import { Person } from '@domains/users/entities';
import { IUserRepository } from '@domains/users/subdomains/user';
import { ICreateRequest } from '@interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { CreatePerson } from './AbstractCreatePersons';

@injectable()
export class CreateNormalPerson extends CreatePerson {
  constructor(
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
    if (user_type === 0) {
      return this.userTypeormRepository.createOne(rest);
    }

    return super.handle({ user_type, ...rest });
  }
}
