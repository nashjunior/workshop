import { inject, injectable } from 'tsyringe';
import { modelModelToApi } from '../../mapper';
import { IModelsRepository } from '../../repositories';

@injectable()
export class FindModelByUUIDService {
  constructor(
    @inject('ModelsTypeormRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  async execute(id: string) {
    const model = await this.modelsRepository.findByUUID(id);
    return modelModelToApi(model);
  }
}
