export type FindRequestType = {
  query?: string;
  queryFields: string[];
  deleted: boolean;
  sortedFields: string[];
  sortedFieldsType: string[];
  page?: number;
  perPage?: number;
};
