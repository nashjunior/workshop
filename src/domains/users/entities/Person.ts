import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { Worker } from './Worker';

@Entity('persons', { schema: 'public' })
export class Person {
  @PrimaryColumn('uuid', { name: 'uuid' })
  id: string;

  @PrimaryGeneratedColumn('increment', { name: 'id_person' })
  idPerson: number;

  @Column()
  name: string;

  @Column({ name: 'cpf_cnpj' })
  cpfCnpj: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Worker, ({ person }) => person)
  worker: Worker;

  @OneToOne(() => Client, ({ person }) => person)
  client: Client;
}
