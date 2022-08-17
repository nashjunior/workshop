import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Worker } from './Worker';

@Entity('persons', { schema: 'public' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_person' })
  idPerson: number;

  @Column()
  name: string;

  @Column({ name: 'cpf_cnpj' })
  cpfCnpj: string;

  @OneToOne(() => Worker, ({ person }) => person)
  worker: Worker;

  @OneToOne(() => Client, ({ person }) => person)
  client: Client;
}
