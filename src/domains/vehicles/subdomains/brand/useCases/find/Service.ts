import { FindRequestType } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { IBrandsRepository } from '../../repositories';
import { findBrandsSchema } from '../../schemas';
import { ValidationError } from 'yup';
import { manyModelBrandsToAPI } from '../../mapper/brand';
import { QueryFields, SortFieldsType } from '../../enums';

@injectable()
export class FindBrandsService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
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
      } = await findBrandsSchema.validate(rest, {
        abortEarly: false,
      });

      const order =
        sortedFields && sortedFieldsType && sortedFields.length > 0
          ? {
              fields: (sortedFields as (keyof typeof SortFieldsType)[]).map(
                field => {
                  console.log(SortFieldsType[field]);
                  return SortFieldsType[field];
                },
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

      const [items, total] = await this.brandsRepository.find({
        deletado: deleted,
        order: order as any,
        query: queryFilter as any,
        page,
        perPage,
      });

      const hasPagination = page && perPage;

      return {
        items: manyModelBrandsToAPI(items),
        total,
        totalPage: hasPagination ? Math.ceil(total / perPage) : 1,
      };
    } catch (error) {
      if (error instanceof ValidationError) throw new ValidationError(error);

      throw error;
    }
  }
}
