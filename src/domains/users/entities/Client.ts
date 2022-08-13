import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientWorker } from './ClientWorker';
import { Person } from './Person';

@Entity('clients', { schema: 'public' })
export class Client {
  @PrimaryColumn({ name: 'uuid' })
  id: string;

  @PrimaryGeneratedColumn({ name: 'id_client' })
  idClient: number;

  @Column({ name: 'id_person' })
  idPerson: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id_person' })
  person: Person;

  @OneToMany(() => ClientWorker, ({ client }) => client)
  workers: ClientWorker[];
}
