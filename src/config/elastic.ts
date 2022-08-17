import apm from 'elastic-apm-node';
import { environment } from './enviroment';

if (!apm.isStarted()) {
  apm.start({
    serviceName: 'Garage-backend',
    serverUrl: environment.parsed?.ELASTIC_APM_URL,
  });
}

export { apm };
