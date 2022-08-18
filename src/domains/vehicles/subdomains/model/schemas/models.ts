import * as Yup from 'yup';

export const createModelSchema = Yup.object().shape({
  name: Yup.string().required().max(128),
  idBrand: Yup.string().uuid('id brand must be uuid').required(),
});
