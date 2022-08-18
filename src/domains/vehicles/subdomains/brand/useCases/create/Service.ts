import { AppError, FieldValidation } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';

import { ValidationError } from 'yup';
import { createBrandSchema } from '../../schemas';
import { CreateBrandDTOType } from '../../dtos';
import { IBrandsRepository } from '../../repositories';
import { modelBrandToApi } from '../../mapper/brand';

@injectable()
export class CreateBrandService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
  ) {}

  async execute(dto: CreateBrandDTOType) {
    try {
      await createBrandSchema.validate(dto);

      const brand = await this.brandsRepository.findByName(dto.name);

      if (brand) throw new AppError('Brand name already exists');

      const createdBrand = await this.brandsRepository.createOne(dto);
      return modelBrandToApi(createdBrand);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new FieldValidation(error);
      }

      throw error;
    }
  }
}
