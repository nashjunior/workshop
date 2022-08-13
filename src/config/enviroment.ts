import dotenv from 'dotenv';

const defaultEnv = '.env';

const path = process.env.NODE_ENV
  ? `${defaultEnv}.${process.env.NODE_ENV}`
  : defaultEnv;

export const environment = dotenv.config({ path });
