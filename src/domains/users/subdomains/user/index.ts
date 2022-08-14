import { dependecyContainer } from '../../../../container';
import {
  ClientTypeormRepository,
  IClientRepositoty,
  IUserRepository,
  IWorkerRepository,
  UserTypeormRepository,
  WorkerTypeormRepository,
} from './repositories';

dependecyContainer.register<IUserRepository>('UserTypeormRepository', {
  useValue: UserTypeormRepository,
});

dependecyContainer.register<IWorkerRepository>('WorkerTypeormRepository', {
  useValue: WorkerTypeormRepository,
});

dependecyContainer.register<IClientRepositoty>('ClientTypeormRepository', {
  useValue: ClientTypeormRepository,
});

export * from './useCases';
export * from './repositories/interfaces';

export * from './routes';
export * from './patterns';
