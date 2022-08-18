import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Worker } from './Worker';

@Entity('clients_workers', { schema: 'public' })
export class ClientWorker extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id_client_worker' })
  idClientWorker: number;

  @Column({ name: 'id_worker' })
  idWorker: number;

  @Column({ name: 'id_client' })
  idClient: number;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'id_worker' })
  worker: Worker;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'id_client' })
  client: Client;
}
