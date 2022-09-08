import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import { CreatePartPhotoService } from '../useCases';
import { FileInfo } from 'busboy';

type BodyType = {
  url?: string;
  id_part: string;
  files?: (FileInfo & { data: Buffer })[];
};

@injectable()
export class PartsPhotosController {
  async create(
    request: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const { id_part: idPart, url, files } = request.body;

    const createPartPhoto = dependecyContainer.resolve(CreatePartPhotoService);

    const partPhoto = await createPartPhoto.execute({
      createdBy: '123',
      idPart,
      files,
      url,
    });

    return response.status(201).send(partPhoto);
  }
}
