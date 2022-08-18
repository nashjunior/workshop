import { dependecyContainer } from '../../../../../container';
import { IModelsRepository } from './interfaces';
import { ModelsTypeormRepository } from './typeorm';

export * from './interfaces';

dependecyContainer.register<IModelsRepository>('ModelsTypeormRepository', {
  useValue: ModelsTypeormRepository,
});
