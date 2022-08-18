import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateSchemaVehicles1660828716832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('vehicles');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('vehicles');
  }
}
