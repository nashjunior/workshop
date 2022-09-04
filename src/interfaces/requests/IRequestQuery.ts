export type IRequestQueryType = {
  query: string;
  'query_fields[]': string[];
  sort: string[];
  order_sort: ('ASC' | 'DESC')[];
  deleted?: string;
  page?: number;
  perPage?: number;
};
