import { dependecyContainer } from '../../../../../container';
import { IPartsRepository } from './interfaces';
import { PartsRepository as PartsTypeormRepository } from './typeorm';

export * from './interfaces';

dependecyContainer.register<IPartsRepository>('PartsTypeormRepository', {
  useValue: PartsTypeormRepository,
});
