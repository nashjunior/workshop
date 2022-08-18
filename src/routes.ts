import { clientsRouter } from '@domains/users/subdomains/client';
import { userRouter } from '@domains/users/subdomains/user';
import { brandsRouter } from '@domains/vehicles/subdomains/brand';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
server.register(clientsRouter, { prefix: '/clients' });
server.register(brandsRouter, { prefix: '/brands' });
