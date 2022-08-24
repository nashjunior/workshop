import { CreatedModelType } from './CreatedModelType';

export type CreatedVehicleType = {
  id: string;
  fabrication_year: number;
  model_year: number;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  model?: CreatedModelType;
};
