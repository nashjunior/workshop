import { Client } from './Client';
import { ClientWorker } from './ClientWorker';
import { Person } from './Person';
import { Worker } from './Worker';

export * from './Person';
export * from './Worker';
export * from './Client';
export * from './ClientWorker';

export const entities = [Person, Worker, Client, ClientWorker];
