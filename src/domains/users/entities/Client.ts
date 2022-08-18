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

@Entity('clients', { schema: 'public' })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_client' })
  idClient: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id_person' })
  person: Person;

  @OneToMany(() => ClientWorker, ({ client }) => client)
  workers: ClientWorker[];
}
