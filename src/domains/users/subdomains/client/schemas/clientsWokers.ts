import * as Yup from 'yup';
import { validate } from 'uuid';

const testUUID: Yup.TestFunction<string | undefined> = uuid => {
  if (!uuid) return false;
  return validate(uuid);
};

export const createClientWorkersSchema = Yup.object().shape({
  idClient: Yup.string().required().length(36).test('isUUUID', testUUID),
  idsWorkers: Yup.array()
    .of(Yup.string().required().length(36).test('isUUUID', testUUID))
    .required()
    .min(1),
});
