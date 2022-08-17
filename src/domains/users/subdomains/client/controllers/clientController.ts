import { ICreateRequest } from '../../../../../interfaces/requests';
import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateClientWokers } from '../useCases';

type CreateRequestType = ICreateRequest & {
  id_client: string;
  ids_workers: string[];
};

export class ClientController {
  async create(
    request: FastifyRequest<{ Body: CreateRequestType }>,
    response: FastifyReply,
  ) {
    const { id_client, ids_workers } = request.body;

    const createClientWokers = dependecyContainer.resolve(CreateClientWokers);

    const clientsWokers = await createClientWokers.execute({
      idClient: id_client,
      idsWorkers: ids_workers,
      createdBy: 'aeuah',
    });

    return response.status(201).send(clientsWokers);
  }
}
