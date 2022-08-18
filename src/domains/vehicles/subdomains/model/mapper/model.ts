import { Model } from '@domains/vehicles/entites';
import { CreatedModelType } from '../../../../../interfaces/response';
import { modelBrandToApi } from '../../brand/mapper/brand';

export const modelModelToApi = ({
  id,
  createdAt,
  updatedAt,
  name,
  deletedAt,
  brand,
}: Model): CreatedModelType => {
  return {
    id,
    name,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
    brand: modelBrandToApi(brand),
  };
};

export const manyModelModelsToAPI = (clients: Model[]): CreatedModelType[] => {
  return clients.map(client => modelModelToApi(client));
};
