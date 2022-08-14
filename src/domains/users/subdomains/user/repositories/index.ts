import { dependecyContainer } from '../../../../../container';
import {
  IClientRepositoty,
  IUserRepository,
  IWorkerRepository,
} from './interfaces';
import {
  ClientTypeormRepository,
  UserTypeormRepository,
  WorkerTypeormRepository,
} from './typeorm';

export * from './interfaces';

dependecyContainer.register<IUserRepository>('UserTypeormRepository', {
  useValue: UserTypeormRepository,
});

dependecyContainer.register<IWorkerRepository>('WorkerTypeormRepository', {
  useValue: WorkerTypeormRepository,
});

dependecyContainer.register<IClientRepositoty>('ClientTypeormRepository', {
  useValue: ClientTypeormRepository,
});
