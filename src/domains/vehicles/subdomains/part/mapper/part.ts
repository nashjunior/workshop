import { Part } from '@domains/vehicles/entites';
import { CreatedPartType } from 'interfaces/response/vehicle/CreatedPartType';

export const modelPartToApi = ({
  id,
  createdAt,
  updatedAt,
  name,
  description,
  deletedAt,
}: Part): CreatedPartType => {
  return {
    id: id.trim(),
    name,
    description,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
  };
};

export const manyModelPartsToAPI = (clients: Part[]): CreatedPartType[] => {
  return clients.map(client => modelPartToApi(client));
};
