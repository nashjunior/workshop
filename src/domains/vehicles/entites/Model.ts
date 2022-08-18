import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Brand } from './Brand';

@Entity('models', { schema: 'vehicles' })
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_model' })
  idModel: number;

  @Column({ name: 'id_brand' })
  idBrand: number;

  @Column()
  name: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'id_brand' })
  brand: Brand;
}
