import { clientsRouter } from '@domains/users/subdomains/client';
import { userRouter } from '@domains/users/subdomains/user';
import { brandsRouter } from '@domains/vehicles/subdomains/brand';
import { modelsRouter } from '@domains/vehicles/subdomains/model';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
server.register(clientsRouter, { prefix: '/clients' });
server.register(brandsRouter, { prefix: '/brands' });
server.register(modelsRouter, { prefix: '/models' });
