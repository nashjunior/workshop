import { EntityNotFound } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { IBrandsRepository } from '../../repositories';
import { EntityNotFoundError } from 'typeorm';
import { modelBrandToApi } from '../../mapper/brand';

@injectable()
export class FindBrandByUUIDService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
  ) {}

  async execute(id: string) {
    try {
      const brand = await this.brandsRepository.findByUUID(id);
      return modelBrandToApi(brand);
    } catch (error) {
      throw new EntityNotFound(error as EntityNotFoundError);
    }
  }
}
