import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableClients1660216714820 implements MigrationInterface {
  private table = new Table({
    name: 'clients',
    columns: [
      { name: 'id_client', type: 'int', isPrimary: true, isGenerated: true },
      {
        name: 'uuid',
        type: 'char',
        length: '64',
        isUnique: true,
      },
      { name: 'id_person', type: 'int', isNullable: false },
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
        name: 'FK_PERSON',
        referencedTableName: 'persons',
        referencedColumnNames: ['id_person'],
        columnNames: ['id_person'],
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
