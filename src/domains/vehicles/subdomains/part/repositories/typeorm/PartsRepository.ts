import { GarageDataSource } from '@database/sources';
import { Part } from '@domains/vehicles/entites';
import { IPartsRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';
import { Brackets } from 'typeorm';

export const PartsRepository = GarageDataSource.getRepository(
  Part,
).extend<IPartsRepository>({
  createOne(dto) {
    console.log(dto);

    const instance = this.create({ ...dto, id: uuidV4() });

    return this.save(instance);
  },

  findByUUID(id) {
    return this.findOneOrFail({ where: { id } });
  },

  find({ deleted = false, order, query, page, perPage }) {
    const queryBuilder = this.createQueryBuilder('parts').where(
      `parts.deletedAt ${deleted ? 'IS NOT NULL' : 'IS NULL'}`,
    );

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
