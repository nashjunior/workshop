import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('parts', { schema: 'vehicles' })
export class Part extends BaseEntity {
  @Column({ name: 'id_part' })
  idPart: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description?: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
