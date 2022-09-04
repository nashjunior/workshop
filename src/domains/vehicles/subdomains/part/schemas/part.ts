import * as yup from 'yup';

export const createPartSchema = yup.object().shape({
  name: yup.string().required().max(128),
  description: yup.string().notRequired(),
});
