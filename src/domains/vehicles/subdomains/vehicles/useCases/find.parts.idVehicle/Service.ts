import { FindRequestType } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import { manyModelVVehiclePartsToAPI } from '../../mapper';
import { IVVehiclePartsRepository } from '../../repositories';

type IRequestType = Omit<FindRequestType, 'deleted'> & { id: string };

@injectable()
export class FindVehiclePartsByIdVehicleService {
  constructor(
    @inject('VVehiclePartsTypeormRepository')
    private vVehiclePartsRepository: IVVehiclePartsRepository,
  ) {}

  async execute({ id, page, perPage }: IRequestType) {
    const [items, total] = await this.vVehiclePartsRepository.findByIdVehicle({
      id,
      page,
      perPage,
      order: undefined as any,
    });

    const hasPagination = page && perPage;

    return {
      items: manyModelVVehiclePartsToAPI(items),
      total,
      totalPage: hasPagination ? Math.ceil(total / perPage) : 1,
    };
  }
}
