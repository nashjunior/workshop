import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateViewVehicleParts1662642495933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE VIEW vehicles.v_vehicle_parts as
    SELECT vp.uuid as id_vehicle_part, v.uuid as id_vehicle, p.uuid as id_part,
      m."name" as vehicle_name, p."name" as part_name
    FROM vehicles.vehicles_parts vp
    JOIN vehicles.vehicles v on v.id_vehicle = vp.id_vehicle and vp.deleted_at is null
    JOIN vehicles.models m on m.id_model = v.id_model
    JOIN vehicles.parts p on p.id_part = vp.id_part and p.deleted_at is null

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW vehicles.v_vehicle_parts`);
  }
}
