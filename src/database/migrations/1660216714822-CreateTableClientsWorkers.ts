import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableClientsWorkers1660216714822
  implements MigrationInterface
{
  private table = new Table({
    name: 'clients_workers',
    columns: [
      {
        name: 'uuid',
        type: 'char',
        length: '64',
        isUnique: true,
      },
      {
        name: 'id_client_worker',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'id_worker', type: 'int', isNullable: false },
      { name: 'id_client', type: 'int', isNullable: false },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
      { name: 'updated_at', type: 'timestamp', isNullable: true },
    ],
    foreignKeys: [
      {
        name: 'FK_WORKER',
        referencedTableName: 'workers',
        referencedColumnNames: ['id_worker'],
        columnNames: ['id_worker'],
        onUpdate: 'CASCADE',
      },

      {
        name: 'FK_CLIENT',
        referencedTableName: 'clients',
        referencedColumnNames: ['id_client'],
        columnNames: ['id_client'],
        onUpdate: 'CASCADE',
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
