import * as yup from 'yup';
import { Multipart } from '@fastify/multipart';

export const createPartPhotoSchema = yup.object().shape(
  {
    url: yup
      .string()
      .notRequired()
      .when('files', {
        is: (url?: string) => !url,
        then: yup.string().required(),
      }),
    files: yup
      .array()
      .of(yup.mixed<Multipart>().required())
      .notRequired()
      .when('url', {
        is: (url?: string) => !url,
        then: yup
          .array()
          .of(yup.mixed<Multipart>().required())
          .required()
          .min(1),
      }),
  },
  ['url', 'files'] as any,
);
