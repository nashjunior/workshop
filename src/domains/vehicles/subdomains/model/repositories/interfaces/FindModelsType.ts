export type FindModelsType = {
  deleted: boolean;
  query?: {
    fields: string[];
    value: string;
  };
  order: {
    fields: string[];
    type: ('ASC' | 'DESC')[];
  };
  page?: number;
  perPage?: number;
};
