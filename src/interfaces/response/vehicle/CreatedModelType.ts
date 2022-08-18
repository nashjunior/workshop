import { CreatedBrandType } from './CreatedBrandType';

export type CreatedModelType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  brand?: CreatedBrandType;
};
