import * as Yup from 'yup';
import { QueryFields, SortFieldsType } from '../enums';

export const createBrandSchema = Yup.object().shape({
  name: Yup.string().required().max(128),
});

export const findBrandsSchema = Yup.object().shape(
  {
    query: Yup.string().notRequired(),
    queryFields: Yup.array().of(
      Yup.mixed<QueryFields>().oneOf([QueryFields.NAME]),
    ),

    sortedFields: Yup.array()
      .of(Yup.string().oneOf(['asc', 'desc', 'ASC', 'DESC']).uppercase())
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
    sortedFieldsType: Yup.array()
      .of(
        Yup.mixed<SortFieldsType>().oneOf([
          SortFieldsType.createdAt,
          SortFieldsType.name,
        ]),
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

    page: Yup.number().notRequired().typeError('Invalid format page'),
    perPage: Yup.number().notRequired().typeError('Invalid format perPage'),
  },
  ['sortedFields', 'sortedFieldsType'] as any,
);
