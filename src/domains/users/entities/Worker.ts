import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ClientWorker } from './ClientWorker';
import { Person } from './Person';

@Entity('workers', { schema: 'public' })
export class Worker extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_worker' })
  idWorker: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id_person' })
  person: Person;

  @OneToMany(() => ClientWorker, ({ worker }) => worker)
  clients: ClientWorker[];
}
