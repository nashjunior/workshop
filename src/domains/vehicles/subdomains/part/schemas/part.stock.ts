import * as yup from 'yup';

export const createPartStockSchema = yup.object().shape({
  amount: yup.number().required().typeError('Required field').positive(),
  unit_value: yup.number().required().typeError('Required field').positive(),
  default_selling_price: yup
    .number()
    .required()
    .typeError('Required field')
    .positive(),
});
