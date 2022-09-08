import * as Yup from 'yup';

export const createVehiclePartsSchema = Yup.object().shape({
  ids_parts: Yup.array().of(Yup.string().required().uuid()).required().min(1),
});
