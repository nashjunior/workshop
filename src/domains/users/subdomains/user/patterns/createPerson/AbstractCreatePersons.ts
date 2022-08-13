import { Person } from '@domains/users/entities';
import { CreateUserDTOType } from '@domains/users/subdomains/user/dtos';
import { ICreateUserHandler } from './interfaces/ICreateUserHandler';

export abstract class CreatePerson implements ICreateUserHandler {
  private nextHandler: ICreateUserHandler;

  public setNext(handler: ICreateUserHandler): ICreateUserHandler {
    this.nextHandler = handler;

    return handler;
  }

  public async handle(
    request: CreateUserDTOType & { user_type: 0 | 1 | 2 },
  ): Promise<Person | undefined> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return undefined;
  }
}
