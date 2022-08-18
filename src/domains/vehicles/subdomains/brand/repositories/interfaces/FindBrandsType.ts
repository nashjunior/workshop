import { QueryFields, SortFieldsType } from '../../enums';

export type FindBrandsType = {
  deletado: boolean;
  query?: {
    fields: QueryFields[];
    value: string;
  };
  order: {
    fields: SortFieldsType[];
    type: ('ASC' | 'DESC')[];
  };
  page?: number;
  perPage?: number;
};
