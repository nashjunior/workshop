import { GarageDataSource } from '@database/sources';
import { Model } from '@domains/vehicles/entites';
import { IModelsRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';
import { Brackets } from 'typeorm';

export const ModelsTypeormRepository = GarageDataSource.getRepository(
  Model,
).extend<IModelsRepository>({
  findByUUID(id) {
    return this.findOneOrFail({ where: { id }, relations: ['brand'] });
  },

  createOne(dto) {
    const instance = this.create({
      id: uuidV4(),
      ...dto,
    });
    return this.save(instance);
  },

  find({ deleted = false, order, query, page, perPage }) {
    const queryBuilder = this.createQueryBuilder('models')
      .innerJoinAndSelect('models.brand', 'brand')
      .where(`models.deletedAt ${deleted ? 'IS NOT NULL' : 'IS NULL'}`);

    if (query) {
      const { fields, value } = query;
      queryBuilder.andWhere(
        new Brackets(subQb => {
          fields.forEach(field =>
            subQb.orWhere(`${field} ILIKE ('%${value}%')`),
          );
        }),
      );
    }

    if (order) {
      order.fields.forEach((field, index) => {
        if (index === 0) queryBuilder.orderBy(field, order.type[index]);
        else queryBuilder.addOrderBy(field, order.type[index]);
      });
    }

    const hasPagination = page && perPage;

    if (hasPagination) {
      queryBuilder.skip(page * perPage - perPage).take(perPage);
    }

    return queryBuilder.getManyAndCount();
  },
});
