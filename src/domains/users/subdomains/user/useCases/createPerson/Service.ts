import { FieldValidation } from '@errors/FieldValidation';
import { inject, injectable } from 'tsyringe';
import { ValidationError } from 'yup';
import { CreateUserDTOType } from '../../dtos';
import { modelPersonToApi } from '../../mappers/Person';
import { ICreateUserHandler } from '../../patterns/createPerson';
import { createUserSchema } from '../../schemas';

@injectable()
export class CreateUserService {
  constructor(
    @inject('CreatePersonChainService')
    private personservice: ICreateUserHandler,
  ) {}

  async execute({ type, ...user }: CreateUserDTOType & { type: 0 | 1 | 2 }) {
    try {
      await createUserSchema.validate({ ...user, type }, { abortEarly: false });

      const userCreated = await this.personservice.handle({
        ...user,
        user_type: type,
      });

      if (!userCreated) throw new Error('Erro na requisicao');

      return modelPersonToApi(userCreated);
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);
      throw new Error('Teste');
    }
  }
}
