import { dependecyContainer } from 'container';
import {
  ClientsTypeormRepository,
  ClientsWorkersTypeormRepository,
  IClientsRepository,
  IClientsWorkersRepository,
  IWokersRepository,
  WorkersTypeormRepository,
} from './repositories';

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

export * from './repositories/interfaces';
export * from './useCases';
export * from './controllers';
export * from './routes';
