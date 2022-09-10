import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('parts_stocks', { schema: 'vehicles' })
export class PartStock extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_part_stock' })
  idPartStock: number;

  @Column({ name: 'id_part' })
  idPart: number;

  @Column('numeric')
  amount: number;

  @Column('numeric', { name: 'unit_value' })
  unitValue: number;

  @Column('numeric', { name: 'default_selling_price' })
  defaultSellingPrice: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
