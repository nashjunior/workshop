import { dependecyContainer } from '../../../../../container';
import {
  IClientsRepository,
  IClientsWorkersRepository,
  IWokersRepository,
} from './interfaces';
import {
  ClientsTypeormRepository,
  ClientsWorkersTypeormRepository,
  WorkersTypeormRepository,
} from './typeorm';

export * from './interfaces';

dependecyContainer.register<IClientsRepository>('ClientsTypeormRepository', {
  useValue: ClientsTypeormRepository,
});

dependecyContainer.register<IWokersRepository>('WorkersTypeormRepository', {
  useValue: WorkersTypeormRepository,
});

dependecyContainer.register<IClientsWorkersRepository>(
  'ClientsWorkersTypeormRepository',
  { useValue: ClientsWorkersTypeormRepository },
);
