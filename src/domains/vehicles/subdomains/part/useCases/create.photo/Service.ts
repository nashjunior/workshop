import { ICreateRequest } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { IPartsPhotosRepository } from '../../repositories/interfaces/IPartsPhotosRepository';
import { createPartPhotoSchema } from '../../schemas';
import { ValidationError } from 'yup';
import { FieldValidation } from '../../../../../../errors';
import { IPartsRepository } from '../../repositories';
import fs from 'fs';
import { uploadsFolder } from '@config/upload';
import { FileInfo } from 'busboy';
import crypto from 'crypto';
import { ICreatePartPhotoDTOType } from '../../dtos';
import { environment } from '@config/enviroment';
import { manyModelPartsPhotosToAPI } from '../../mapper/part.photo';

type IRequestType = ICreateRequest & {
  url?: string;
  files?: (FileInfo & { data: Buffer })[];
  idPart: string;
};

@injectable()
export class CreatePartPhotoService {
  constructor(
    @inject('PartsPhotosTypeormRepository')
    private partsPhotosRepository: IPartsPhotosRepository,

    @inject('PartsTypeormRepository') private partsRepository: IPartsRepository,
  ) {}

  async execute({ files = [], url, idPart, createdBy }: IRequestType) {
    const newFilesNames: string[] = [];
    let folderName = '';
    const date = new Date();

    if (files.length > 0) {
      folderName = `${uploadsFolder}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      newFilesNames.push(
        ...files.map(file => {
          const hash = crypto.randomBytes(12).toString('hex');
          return `/${hash}-${file?.filename}`;
        }),
      );
    }

    try {
      const { idPart: id } = await this.partsRepository.findByUUID(idPart);

      const dtos: ICreatePartPhotoDTOType[] = [];
      await createPartPhotoSchema.validate(
        { files, url },
        { abortEarly: false },
      );

      if (files.length > 0) {
        fs.mkdirSync(folderName, { recursive: true });

        files.forEach((file, index) => {
          fs.writeFileSync(`${folderName}${newFilesNames[index]}`, file.data);
          dtos.push({
            createdBy,
            idPart: id,
            url: `${
              environment.parsed?.API_BASE_URL
            }/uploads/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}${
              newFilesNames[index]
            }`,
          });
        });
      }

      if (url) dtos.push({ createdBy, idPart: id, url });

      const partPhotos = await this.partsPhotosRepository.createMany(dtos);
      return manyModelPartsPhotosToAPI(partPhotos);
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);

      if (files.length > 0)
        newFilesNames.forEach(newFileName => fs.unlinkSync(newFileName));

      throw error;
    }
  }
}
