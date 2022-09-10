import { FieldValidation } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { ValidationError } from 'yup';
import { ICreatePartDTOType } from '../../dtos';
import { IPartsRepository } from '../../repositories';
import { createPartSchema } from '../../schemas';
import { modelPartToApi } from '../../mapper';

@injectable()
export class CreatePartService {
  constructor(
    @inject('PartsTypeormRepository') private partsRepository: IPartsRepository,
  ) {}

  async execute({
    name,
    description,
    measureUnit,
    ...rest
  }: ICreatePartDTOType) {
    try {
      await createPartSchema.validate(
        { name, description, measure_unit: measureUnit },
        { abortEarly: false },
      );

      const part = await this.partsRepository.createOne({
        ...rest,
        measureUnit,
        name,
        description,
      });

      return modelPartToApi(part);
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);

      throw error;
    }
  }
}
