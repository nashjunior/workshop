import { EntityNotFound, FieldValidation } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { ValidationError } from 'yup';
import { CreateVehicleDTOType } from '../../dto/ICreateVehicleDTO';
import { IVehiclesRepository } from '../../repositories';
import { createVehicleSchema } from '../../schemas';
import { IModelsRepository } from '@domains/vehicles/subdomains/model';
import { EntityNotFoundError } from 'typeorm';
import { modelVehicleToApi } from '../../mapper';

type RequestType = Omit<CreateVehicleDTOType, 'idModel'> & { idModel: string };

@injectable()
export class CreateVehicleService {
  constructor(
    @inject('VehiclesTypeormRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('ModelsTypeormRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  async execute({
    fabricationYear,
    createdBy,
    idModel,
    modelYear,
    description,
  }: RequestType) {
    try {
      console.log('aqui');

      await createVehicleSchema.required().validate(
        {
          id_model: idModel,
          fabrication_year: fabricationYear,
          model_year: modelYear,
          description: description,
        },
        { abortEarly: false },
      );

      const { idModel: id, ...rest } = await this.modelsRepository.findByUUID(
        idModel,
      );

      const vehicle = await this.vehiclesRepository.createOne({
        createdBy,
        fabricationYear,
        idModel: id,
        description,
        modelYear,
      });

      return modelVehicleToApi({
        ...vehicle,
        model: { ...rest, idModel: id },
      });
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);

      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);
      throw error;
    }
  }
}
