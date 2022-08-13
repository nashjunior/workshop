import { userRouter } from '@domains/users/subdomains/user';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
