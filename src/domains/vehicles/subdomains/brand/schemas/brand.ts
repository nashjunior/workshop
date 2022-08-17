import * as Yup from 'yup';

export const createBrandSchema = Yup.object().shape({
  name: Yup.string().required().max(128),
});
