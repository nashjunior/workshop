import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableVehicles1661125915981
  implements MigrationInterface
{
  private table = new Table({
    name: 'vehicles',
    schema: 'vehicles',
    columns: [
      { name: 'uuid', type: 'char', length: '64', isUnique: true },
      { name: 'id_vehicle', type: 'int', isPrimary: true, isGenerated: true },
      { name: 'id_model', type: 'int' },
      { name: 'fabrication_year', type: 'smallint' },
      { name: 'model_year', type: 'smallint', isNullable: true },
      { name: 'description', type: 'varchar', length: '126', isNullable: true },

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
    foreignKeys: [
      {
        name: 'FK_MODEL',
        referencedSchema: 'vehicles',
        referencedTableName: 'models',
        referencedColumnNames: ['id_model'],
        columnNames: ['id_model'],
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
