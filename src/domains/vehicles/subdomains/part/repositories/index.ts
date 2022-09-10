import { dependecyContainer } from '../../../../../container';
import { IPartsRepository, IPartsStocksRepository } from './interfaces';
import { IPartsPhotosRepository } from './interfaces';
import {
  PartsPhotosRepository as PartsPhotosTypeormRepository,
  PartsRepository as PartsTypeormRepository,
} from './typeorm';
import { PartsStocksTypeormRepository } from './typeorm/PartsStocksRepository';

export * from './interfaces';

dependecyContainer.register<IPartsRepository>('PartsTypeormRepository', {
  useValue: PartsTypeormRepository,
});

dependecyContainer.register<IPartsPhotosRepository>(
  'PartsPhotosTypeormRepository',
  { useValue: PartsPhotosTypeormRepository },
);

dependecyContainer.register<IPartsStocksRepository>(
  'PartsStocksTypeormRepository',
  { useValue: PartsStocksTypeormRepository },
);
