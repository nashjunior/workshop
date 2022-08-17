import { dependecyContainer } from 'container';
import { IBrandsRepository } from './interfaces';
import { BrandsRepository } from './typeorm/BrandsRepository';

export * from './interfaces';
export * from './typeorm';

dependecyContainer.register<IBrandsRepository>('BrandsRepository', {
  useValue: BrandsRepository,
});
