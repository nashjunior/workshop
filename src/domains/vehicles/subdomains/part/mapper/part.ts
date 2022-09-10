import { Part } from '@domains/vehicles/entites';
import { CreatedPartType } from 'interfaces/response/vehicle/CreatedPartType';

export const modelPartToApi = ({
  id,
  createdAt,
  updatedAt,
  name,
  measureUnit,
  description,
  deletedAt,
}: Part): CreatedPartType => ({
  id: id.trim(),
  name,
  measure_unit: measureUnit,
  description,
  created_at: createdAt,
  updated_at: updatedAt,
  deleted_at: deletedAt,
});

export const manyModelPartsToAPI = (clients: Part[]): CreatedPartType[] =>
  clients.map(client => modelPartToApi(client));
