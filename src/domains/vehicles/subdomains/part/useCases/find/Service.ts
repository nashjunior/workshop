import { FindRequestType } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { IPartsRepository } from '../../repositories';
import { findPartsSchema } from '../../schemas';
import { ValidationError } from 'yup';
import { manyModelPartsToAPI } from '../../mapper';
import { QueryFields, SortFieldsType } from '../../enums';

@injectable()
export class FindPartsService {
  constructor(
    @inject('PartsTypeormRepository')
    private modelsRepository: IPartsRepository,
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
      } = await findPartsSchema.validate(rest, {
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

      const [items, total] = await this.modelsRepository.find({
        deleted,
        order: order as any,
        query: queryFilter as any,
        page,
        perPage,
      });

      const hasPagination = page && perPage;

      return {
        items: manyModelPartsToAPI(items),
        total,
        totalPage: hasPagination ? Math.ceil(total / perPage) : 1,
      };
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) throw new ValidationError(error);

      throw error;
    }
  }
}
