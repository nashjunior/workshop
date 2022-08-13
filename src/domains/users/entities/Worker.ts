import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from './Person';

@Entity('workers', { schema: 'public' })
export class Worker {
  @PrimaryColumn()
  uuid: string;

  @PrimaryGeneratedColumn({ name: 'id_worker' })
  idWorker: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id_person' })
  person: Person;
}
