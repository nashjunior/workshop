import * as yup from 'yup';
import { Multipart } from '@fastify/multipart';

export const createPartPhotoSchema = yup.object().shape(
  {
    url: yup
      .string()
      .notRequired()
      .when('file', {
        is: (url?: string) => !url,
        then: yup.string().required(),
      }),
    file: yup
      .mixed<Multipart>()
      .notRequired()
      .when('url', {
        is: (url?: string) => !url,
        then: yup.mixed<Multipart>().required(),
      }),
  },
  ['url', 'file'] as any,
);
