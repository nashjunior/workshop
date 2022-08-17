import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required().max(256),
  cpfCnpj: Yup.string().required().min(11).max(16),
  type: Yup.number()
    .required()
    .typeError('Wrong "type" type field format')
    .oneOf([0, 1, 2]),
});
