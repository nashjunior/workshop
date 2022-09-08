import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('vehicles_parts', { schema: 'vehicles' })
export class VehiclePart extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_part_vehicle' })
  idPartVehicle: number;

  @Column({ name: 'id_part' })
  idPart: number;

  @Column({ name: 'id_vehicle' })
  idVehicle: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
