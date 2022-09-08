import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePartsPhotosTable1662320971093 implements MigrationInterface {
  private table = new Table({
    name: 'parts_photos',
    schema: 'vehicles',
    columns: [
      { name: 'uuid', type: 'char', length: '64', isUnique: true },
      {
        name: 'id_part_photo',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'id_part', type: 'int' },

      { name: 'url', type: 'varchar', isNullable: true },

      { name: 'created_by', type: 'varchar', isNullable: false },

      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },

      { name: 'updated_by', type: 'varchar', isNullable: true },
      { name: 'updated_at', type: 'timestamp', isNullable: true },

      { name: 'deleted_at', type: 'timestamp', isNullable: true },
    ],

    foreignKeys: [
      {
        name: 'FK_PART_PHOTO',
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
