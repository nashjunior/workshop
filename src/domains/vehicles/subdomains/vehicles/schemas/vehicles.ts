import * as Yup from 'yup';

export const createVehicleSchema = Yup.object().shape({
  id_model: Yup.string().required().uuid(),
  fabrication_year: Yup.number()
    .required()
    .typeError('invalid fabrication year type'),
  model_year: Yup.number().required().typeError('invalid model year type'),
  description: Yup.string().notRequired().max(126),
});
