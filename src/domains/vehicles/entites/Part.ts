import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { PartPhoto } from './PartPhoto';

@Entity('parts', { schema: 'vehicles' })
export class Part extends BaseEntity {
  @Column({ name: 'id_part' })
  idPart: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'measure_unit' })
  measureUnit: number;

  @Column({ name: 'description' })
  description?: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @OneToMany(() => PartPhoto, ({ part }) => part)
  photos: PartPhoto[];
}
