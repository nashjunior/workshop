import { Brand } from '@domains/vehicles/entites';
import { CreatedBrandType } from '../../../../../interfaces/response/vehicle/CreatedBrandType';

export const modelBrandToApi = ({
  id,
  createdAt,
  updatedAt,
  name,
  deletedAt,
}: Brand): CreatedBrandType => {
  return {
    id,
    name,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
  };
};

export const manyModelBrandsToAPI = (clients: Brand[]): CreatedBrandType[] => {
  return clients.map(client => modelBrandToApi(client));
};
