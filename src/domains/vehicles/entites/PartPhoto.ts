import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Part } from './Part';

@Entity('parts_photos', { schema: 'vehicles' })
export class PartPhoto extends BaseEntity {
  @Column()
  url: string;

  @Column({ name: 'id_part' })
  idPart: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'id_part' })
  part: Part;
}
