import { GarageDataSource } from '@database/sources';
import { Brand } from '@domains/vehicles/entites';
import { Brackets, ILike, IsNull } from 'typeorm';
import { IBrandsRepository } from '../interfaces/IBrandsRepository';
import { v4 as uuidV4 } from 'uuid';

export const BrandsRepository = GarageDataSource.getRepository(
  Brand,
).extend<IBrandsRepository>({
  createOne(dto) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });
    return this.save(instance);
  },

  findByName(name) {
    console.log(name);

    return this.findOneBy({ name: ILike(name), deletedAt: IsNull() });
  },

  findByUUID(id) {
    return this.findOneOrFail({ where: { id } });
  },

  find({ deletado = false, order, query, page, perPage }) {
    const queryBuilder = this.createQueryBuilder('brands').where(
      `brands.deletedAt ${deletado ? 'IS NOT NULL' : 'IS NULL'}`,
    );

    if (query) {
      const { fields, value } = query;
      queryBuilder.andWhere(
        new Brackets(subQb => {
          fields.forEach(field => {
            subQb.orWhere(`${field} ILIKE ('%${value}%')`);
          });
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
