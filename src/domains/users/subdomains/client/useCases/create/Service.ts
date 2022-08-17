import { AppError } from '../../../../../../errors/AppError';
import { EntityNotFound } from '../../../../../../errors/EntityNotFound';
import { FieldValidation } from '../../../../../../errors/FieldValidation';
import { inject, injectable } from 'tsyringe';
import { EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'yup';
import { CreateClientWorkersDTOType } from '../../dtos';
import { manyModelClientWorkersToAPI } from '../../mapper';
import {
  IClientsRepository,
  IClientsWorkersRepository,
  IWokersRepository,
} from '../../repositories';
import { createClientWorkersSchema } from '../../schemas';

@injectable()
export class CreateClientWokers {
  constructor(
    @inject('ClientsTypeormRepository')
    private clientsRepository: IClientsRepository,

    @inject('WorkersTypeormRepository')
    private wokersRepository: IWokersRepository,

    @inject('ClientsWorkersTypeormRepository')
    private clientsWorkersRepository: IClientsWorkersRepository,
  ) {}

  async execute({ idClient, idsWorkers }: CreateClientWorkersDTOType) {
    try {
      await createClientWorkersSchema.validate(
        { idClient, idsWorkers },
        { abortEarly: false },
      );

      const client = await this.clientsRepository.findById(idClient);

      const clientsWorkers =
        await this.clientsWorkersRepository.findWorkersByIdClient(
          client.idClient,
        );

      const clientsWorkersAlreadyCreated = idsWorkers.filter(
        idWorker =>
          !!clientsWorkers.find(({ worker: { id } }) => id.trim() === idWorker),
      );

      const workers = await this.wokersRepository.findByIds(
        idsWorkers.filter(id => !clientsWorkersAlreadyCreated.includes(id)),
      );

      if (workers.length < 1) {
        throw new AppError(
          `No available workers for this client or workers already registered`,
        );
      }

      const clientsWorkersCreated =
        await this.clientsWorkersRepository.createMany(
          workers.map(({ idWorker }) => idWorker),
          client.idClient,
          'auewhae',
        );

      const clientsNotCreated = idsWorkers.filter(
        idWorker =>
          !workers.find(({ id }) => idWorker === id.trim()) &&
          !clientsWorkersAlreadyCreated.includes(idWorker),
      );

      const warnings: string[] = [];
      if (clientsNotCreated.length > 0) {
        warnings.push(
          `Could not create workers: ${clientsNotCreated.join(',')}`,
        );
      }

      if (clientsWorkersAlreadyCreated.length > 0) {
        warnings.push(
          `Workers already created: ${clientsWorkersAlreadyCreated.join(',')}`,
        );
      }

      return {
        created: manyModelClientWorkersToAPI(
          clientsWorkersCreated.map((clientWorker, index) => ({
            ...clientWorker,
            client,
            worker: workers[index],
          })),
        ),

        warnings,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);

      if (error instanceof ValidationError) throw new FieldValidation(error);

      throw error;
    }
  }
}
