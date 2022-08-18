import { inject, injectable } from 'tsyringe';
import { IBrandsRepository } from '@domains/vehicles/subdomains/brand';
import { IModelsRepository } from '../../repositories';
import { ICreateModelDTOType } from '../../dtos';
import { createModelSchema } from '../../schemas';
import { ValidationError } from 'yup';
import { EntityNotFound, FieldValidation } from '../../../../../../errors';
import { EntityNotFoundError } from 'typeorm';
import { modelModelToApi } from '../../mapper';

@injectable()
export class CreateModelService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
    @inject('ModelsTypeormRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  async execute({
    idBrand,
    ...rest
  }: Omit<ICreateModelDTOType, 'idBrand'> & { idBrand: string }) {
    try {
      await createModelSchema.validate(
        { ...rest, idBrand },
        { abortEarly: false },
      );

      const { idBrand: id, ...restBrand } =
        await this.brandsRepository.findByUUID(idBrand);

      const model = await this.modelsRepository.createOne({
        ...rest,
        idBrand: id,
      });

      return modelModelToApi({
        ...model,
        brand: { ...restBrand, idBrand: id },
      });
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) throw new FieldValidation(error);

      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);

      throw error;
    }
  }
}
