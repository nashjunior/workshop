import { VVehiclePart } from '@domains/vehicles/entites';
import { VVehiclePartType } from '../../../../../interfaces/response';

export const modelVVehiclePartToApi = ({
  idPart,
  idVehicle,
  idVehiclePart,
  partName,
  vehicleName,
}: VVehiclePart): VVehiclePartType => ({
  id_vehicle_part: idVehiclePart,
  id_vehicle: idVehicle,
  id_part: idPart,
  part_name: partName,
  vehicle_name: vehicleName,
});

export const manyModelVVehiclePartsToAPI = (
  clients: VVehiclePart[],
): VVehiclePartType[] => clients.map(client => modelVVehiclePartToApi(client));
