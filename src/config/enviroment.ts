import dotenv from 'dotenv';
import path from 'path';
const defaultEnv = '.env';

const fileName = process.env.NODE_ENV
  ? `${defaultEnv}.${process.env.NODE_ENV}`
  : defaultEnv;

export const environment = dotenv.config({
  path: path.resolve(__dirname, '..', '..', fileName),
});
