import { dependecyContainer } from '../../../../../../container';
import { CreateClientPerson } from './CreateClientPerson';
import { CreateNormalPerson } from './CreateNormalPerson';
import { CreateWorkerPerson } from './CreateWorkerPerson';

export * from './interfaces';

const normalPerson = dependecyContainer.resolve(CreateNormalPerson);

const workerPerson = dependecyContainer.resolve(CreateWorkerPerson);
const clientPerson = dependecyContainer.resolve(CreateClientPerson);

normalPerson.setNext(workerPerson).setNext(clientPerson);

dependecyContainer.register('CreatePersonChainService', {
  useValue: normalPerson,
});
