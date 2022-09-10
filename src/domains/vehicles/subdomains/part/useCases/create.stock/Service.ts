import { EntityNotFound, FieldValidation } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'yup';
import { IPartsRepository, IPartsStocksRepository } from '../../repositories';
import { ICreatePartStockDTOType } from '../../dtos';
import { createPartStockSchema } from '../../schemas';
import { modelPartToApi } from '../../mapper';
import { modelPartStockToApi } from '../../mapper/part.stock';

type IRequestType = Omit<ICreatePartStockDTOType, 'idPart'> & { id: string };

@injectable()
export class CreatePartStockService {
  constructor(
    @inject('PartsStocksTypeormRepository')
    private partsStocksRepository: IPartsStocksRepository,

    @inject('PartsTypeormRepository') private partsRepository: IPartsRepository,
  ) {}

  async execute({ defaultSellingPrice, unitValue, id, ...rest }: IRequestType) {
    try {
      const part = await this.partsRepository.findByUUID(id);

      await createPartStockSchema.validate(
        {
          ...rest,
          unit_value: unitValue,
          default_selling_price: defaultSellingPrice,
        },
        { abortEarly: false },
      );

      const stock = await this.partsStocksRepository.createOne({
        ...rest,
        unitValue,
        defaultSellingPrice,
        idPart: part.idPart,
      });

      return {
        ...modelPartToApi(part),
        stock: modelPartStockToApi(stock),
      };
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);

      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);

      throw error;
    }
  }
}
