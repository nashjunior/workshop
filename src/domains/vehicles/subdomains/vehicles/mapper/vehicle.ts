import { Vehicle } from '@domains/vehicles/entites';
import { CreatedVehicleType } from '../../../../../interfaces/response';
import { modelModelToApi } from '../../model/mapper';

export const modelVehicleToApi = ({
  id,
  createdAt,
  updatedAt,
  fabricationYear,
  modelYear,
  deletedAt,
  type,
  model,
}: Vehicle): CreatedVehicleType => {
  return {
    id,
    fabrication_year: fabricationYear,
    type,
    model_year: modelYear,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
    model: modelModelToApi(model),
  };
};

export const manyModelVehiclesToAPI = (
  clients: Vehicle[],
): CreatedVehicleType[] => {
  return clients.map(client => modelVehicleToApi(client));
};
