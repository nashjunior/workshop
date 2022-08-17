import { clientsRouter } from '@domains/users/subdomains/client';
import { userRouter } from '@domains/users/subdomains/user';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
server.register(clientsRouter, { prefix: '/clients' });
