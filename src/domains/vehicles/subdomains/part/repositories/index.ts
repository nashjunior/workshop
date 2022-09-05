import { dependecyContainer } from '../../../../../container';
import { IPartsRepository } from './interfaces';
import { IPartsPhotosRepository } from './interfaces';
import {
  PartsPhotosRepository as PartsPhotosTypeormRepository,
  PartsRepository as PartsTypeormRepository,
} from './typeorm';

export * from './interfaces';

dependecyContainer.register<IPartsRepository>('PartsTypeormRepository', {
  useValue: PartsTypeormRepository,
});

dependecyContainer.register<IPartsPhotosRepository>(
  'PartsPhotosTypeormRepository',
  { useValue: PartsPhotosTypeormRepository },
);
