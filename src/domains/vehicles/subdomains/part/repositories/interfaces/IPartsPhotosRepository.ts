import { PartPhoto } from '@domains/vehicles/entites';
import { ICreatePartPhotoDTOType } from '../../dtos/ICreatePartPhotoDTO';

export interface IPartsPhotosRepository {
  createMany(dto: ICreatePartPhotoDTOType[]): Promise<PartPhoto[]>;
}
