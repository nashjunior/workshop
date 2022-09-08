import { PartPhoto } from '@domains/vehicles/entites';
import { CreatedPartPhotoType } from 'interfaces/response/vehicle/CreatedPartPhotoType';

export const modelPartPhotoToApi = ({
  id,
  createdAt,
  updatedAt,
  url,
  deletedAt,
}: PartPhoto): CreatedPartPhotoType => {
  return {
    id: id.trim(),
    url,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
  };
};

export const manyModelPartsPhotosToAPI = (
  clients: PartPhoto[],
): CreatedPartPhotoType[] => {
  return clients.map(client => modelPartPhotoToApi(client));
};
