import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVehiclesParts1662590235598
  implements MigrationInterface
{
  private table = new Table({
    name: 'vehicles_parts',
    schema: 'vehicles',
    columns: [
      { name: 'uuid', type: 'char', length: '64', isUnique: true },
      {
        name: 'id_part_vehicle',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'id_vehicle', type: 'int' },
      { name: 'id_part', type: 'int' },

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

      {
        name: 'FK_VEHICLE',
        referencedSchema: 'vehicles',
        referencedTableName: 'vehicles',
        referencedColumnNames: ['id_vehicle'],
        columnNames: ['id_vehicle'],
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
