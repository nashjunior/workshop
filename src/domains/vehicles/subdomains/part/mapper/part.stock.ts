import { PartStock } from '@domains/vehicles/entites';
import { PartStockType } from 'interfaces/response/vehicle/PartStockType';

export const modelPartStockToApi = ({
  id,
  createdAt,
  updatedAt,
  amount,
  unitValue,
  defaultSellingPrice,
  deletedAt,
}: PartStock): PartStockType => {
  return {
    id: id.trim(),
    amount,
    unit_value: unitValue,
    default_selling_price: defaultSellingPrice,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
  };
};

export const manyModelPartsPhotosToAPI = (
  clients: PartStock[],
): PartStockType[] => {
  return clients.map(client => modelPartStockToApi(client));
};
