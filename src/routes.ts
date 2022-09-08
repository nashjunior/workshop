import { clientsRouter } from '@domains/users/subdomains/client';
import { userRouter } from '@domains/users/subdomains/user';
import { brandsRouter } from '@domains/vehicles/subdomains/brand';
import { modelsRouter } from '@domains/vehicles/subdomains/model';
import { partsRouter } from '@domains/vehicles/subdomains/part';
import { partsPhotosRouter } from '@domains/vehicles/subdomains/part/routes/part.photo';
import {
  vehiclePartsRouter,
  vehiclesRouter,
} from '@domains/vehicles/subdomains/vehicles';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
server.register(clientsRouter, { prefix: '/clients' });
server.register(brandsRouter, { prefix: '/brands' });
server.register(modelsRouter, { prefix: '/models' });
server.register(vehiclesRouter, { prefix: '/vehicles' });
server.register(partsRouter, { prefix: '/parts' });
server.register(partsPhotosRouter, { prefix: '/parts_photos' });
server.register(vehiclePartsRouter, { prefix: '/vehicle_parts' });
