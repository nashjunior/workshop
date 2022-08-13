import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './Client';
import { Worker } from './Worker';

@Entity('clients_workers', { schema: 'public' })
export class ClientWorker {
  @PrimaryColumn()
  uuid: string;

  @PrimaryGeneratedColumn('increment', { name: 'id_client_worker' })
  idClientWorker: number;

  @Column({ name: 'id_worker' })
  idWorker: number;

  @Column({ name: 'id_client' })
  idClient: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'id_worker' })
  worker: Worker;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'id_client' })
  client: Client;
}
