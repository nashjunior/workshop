import { EntityNotFound } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { EntityNotFoundError } from 'typeorm';
import { modelPartToApi } from '../../mapper';
import { IPartsRepository } from '../../repositories';

@injectable()
export class FindPartByUUIDService {
  constructor(
    @inject('PartsTypeormRepository') private partsRepository: IPartsRepository,
  ) {}

  async execute(id: string) {
    try {
      const part = await this.partsRepository.findByUUID(id);

      return modelPartToApi(part);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);

      throw error;
    }
  }
}
