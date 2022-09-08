import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Model } from './Model';

@Entity('vehicles', { schema: 'vehicles' })
export class Vehicle extends BaseEntity {
  @PrimaryColumn({ name: 'uuid' })
  id: string;

  @PrimaryGeneratedColumn({ name: 'id_vehicle' })
  idVehicle: number;

  @Column({ name: 'id_model' })
  idModel: number;

  @Column()
  type: string;

  @Column({ name: 'fabrication_year' })
  fabricationYear: number;

  @Column({ name: 'model_year' })
  modelYear: number;

  @Column()
  description: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => Model)
  @JoinColumn({ name: 'id_model' })
  model: Model;
}
