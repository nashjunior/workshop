import { GarageDataSource } from '@database/sources';
import { Vehicle } from '@domains/vehicles/entites';
import { IVehiclesRepository } from '../interfaces/IVehiclesRepository';
import { v4 as uuidV4 } from 'uuid';
import { Brackets } from 'typeorm';

export const VehiclesTypeormRepository = GarageDataSource.getRepository(
  Vehicle,
).extend<IVehiclesRepository>({
  createOne(dto) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return this.save(instance);
  },

  findByUUID(id) {
    return this.findOneOrFail({
      where: { id },
      relations: ['model', 'model.brand'],
    });
  },

  find({ deleted = false, order, query, page, perPage }) {
    const queryBuilder = this.createQueryBuilder('vehicles')
      .innerJoinAndSelect(
        'vehicles.model',
        'model',
        `vehicles.deletedAt ${deleted ? 'IS NOT NULL' : 'IS NULL'}`,
      )
      .innerJoinAndSelect('model.brand', 'brand');

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
