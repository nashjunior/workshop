import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePartStockService } from '../useCases';

type BodyType = {
  id_part: string;
  amount: number;
  unit_value: number;
  default_selling_price: number;
};

export class PartsStocksController {
  async create(
    {
      body: {
        id_part: idPart,
        amount,
        unit_value: unitValue,
        default_selling_price: defaultSellingPrice,
      },
    }: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const createBrandService = dependecyContainer.resolve(
      CreatePartStockService,
    );

    const part = await createBrandService.execute({
      createdBy: '123',
      id: idPart,
      amount,
      defaultSellingPrice,
      unitValue,
    });

    return response.status(201).send(part);
  }
}
