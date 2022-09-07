import * as yup from 'yup';
import { QueryFields, SortFieldsType } from '../enums';

export const createPartSchema = yup.object().shape({
  name: yup.string().required().max(128),
  description: yup.string().notRequired(),
});

export const findPartsSchema = yup.object().shape(
  {
    query: yup.string().notRequired(),
    queryFields: yup
      .array()
      .of(
        yup
          .mixed<keyof typeof QueryFields>()
          .oneOf(Object.keys(QueryFields) as any),
      ),

    sortedFieldsType: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(['asc', 'desc', 'ASC', 'DESC'])
          .uppercase()
          .required(),
      )
      .test(
        'isSameSize',
        'fields to sort length and types of sort length does not match',
        function (fields) {
          const {
            parent: { sortedFieldsType },
          } = this;

          return sortedFieldsType?.length === fields?.length;
        },
      ),
    sortedFields: yup
      .array()
      .of(
        yup
          .mixed<keyof typeof SortFieldsType>()
          .oneOf(Object.keys(SortFieldsType) as any)
          .required(),
      )
      .test(
        'isSameSize',
        'types sort length and fields to sort length  does not match',
        function (fields) {
          const {
            parent: { sortedFields },
          } = this;

          return sortedFields?.length === fields?.length;
        },
      ),

    page: yup.number().notRequired().typeError('Invalid format page'),
    perPage: yup.number().notRequired().typeError('Invalid format perPage'),
  },
  ['sortedFields', 'sortedFieldsType'] as any,
);
