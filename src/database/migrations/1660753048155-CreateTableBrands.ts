import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableBrands1660753048155
  implements MigrationInterface
{
  private table = new Table({
    name: 'brands',
    schema: 'public',
    columns: [
      { name: 'uuid', type: 'char', length: '64', isUnique: true },
      { name: 'id_brand', type: 'int', isPrimary: true, isGenerated: true },

      { name: 'name', type: 'varchar', length: '128' },
      {
        name: 'created_by',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },

      {
        name: 'updated_by',
        type: 'varchar',
        isNullable: true,
      },

      { name: 'updated_at', type: 'timestamp', isNullable: true },

      { name: 'deleted_at', type: 'timestamp', isNullable: true },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
