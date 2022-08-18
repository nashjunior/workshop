import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('brands', { schema: 'public' })
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_brand' })
  idBrand: number;

  @Column()
  name: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
