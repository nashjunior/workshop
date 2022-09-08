import { VehiclePart } from '@domains/vehicles/entites';
import { CreatedVehiclePartsType } from '../../../../../interfaces/response';

export const modelVehiclePartToApi = ({
  id,
  createdAt,
  updatedAt,
  deletedAt,
}: VehiclePart): CreatedVehiclePartsType => ({
  id,
  created_at: createdAt,
  updated_at: updatedAt,
  deleted_at: deletedAt,
});

export const manyModelVehiclePartsToAPI = (
  clients: VehiclePart[],
): CreatedVehiclePartsType[] =>
  clients.map(client => modelVehiclePartToApi(client));
