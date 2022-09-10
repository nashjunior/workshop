import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePartsStocks1662684251317 implements MigrationInterface {
  private table = new Table({
    name: 'parts_stocks',
    schema: 'vehicles',
    columns: [
      { name: 'uuid', type: 'char', length: '64', isUnique: true },
      {
        name: 'id_part_stock',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'id_part', type: 'int' },

      { name: 'amount', type: 'numeric' },
      { name: 'unit_value', type: 'numeric' },
      { name: 'default_selling_price', type: 'numeric' },

      { name: 'created_by', type: 'varchar' },
      { name: 'created_at', type: 'timestamp', default: 'now()' },

      { name: 'updated_by', type: 'varchar', isNullable: true },
      { name: 'updated_at', type: 'timestamp', isNullable: true },

      { name: 'deleted_at', type: 'timestamp', isNullable: true },
    ],

    foreignKeys: [
      {
        name: 'FK_PART',
        referencedSchema: 'vehicles',
        referencedTableName: 'parts',
        referencedColumnNames: ['id_part'],
        columnNames: ['id_part'],
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
