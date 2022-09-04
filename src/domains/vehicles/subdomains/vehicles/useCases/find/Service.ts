import { FindRequestType } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { IVehiclesRepository } from '../../repositories';
import { findVehiclesSchema } from '../../schemas';
import { QueryFields, SortFieldsType } from '../../enums';
import { manyModelVehiclesToAPI } from '../../mapper';
import { ValidationError } from 'yup';
import { FieldValidation } from '../../../../../../errors';

@injectable()
export class FindVehiclesService {
  constructor(
    @inject('VehiclesTypeormRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  async execute({ deleted = false, ...rest }: FindRequestType) {
    try {
      const {
        query,
        queryFields,
        sortedFields,
        sortedFieldsType,
        page,
        perPage,
      } = await findVehiclesSchema.validate(rest, {
        abortEarly: false,
      });

      const order =
        sortedFields && sortedFieldsType && sortedFields.length > 0
          ? {
              fields: (sortedFields as (keyof typeof SortFieldsType)[]).map(
                field => SortFieldsType[field],
              ),
              type: sortedFieldsType,
            }
          : undefined;
      const queryFilter =
        query && queryFields && queryFields.length > 0
          ? {
              value: query,
              fields: (queryFields as (keyof typeof QueryFields)[]).map(
                field => QueryFields[field],
              ),
            }
          : undefined;

      const [items, total] = await this.vehiclesRepository.find({
        deleted,
        order: order as any,
        query: queryFilter as any,
        page,
        perPage,
      });

      const hasPagination = page && perPage;

      return {
        items: manyModelVehiclesToAPI(items),
        total,
        totalPage: hasPagination ? Math.ceil(total / perPage) : 1,
      };
    } catch (error) {
      if (error instanceof ValidationError) throw new FieldValidation(error);

      throw error;
    }
  }
}
