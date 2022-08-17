import { Person } from '@domains/users/entities';
import { CreateUserDTOType } from '@domains/users/subdomains/user/dtos';

export interface ICreateUserHandler {
  setNext(handler: ICreateUserHandler): ICreateUserHandler;

  handle(
    request: CreateUserDTOType & { user_type: 0 | 1 | 2 },
  ): Promise<Person | undefined>;
}
