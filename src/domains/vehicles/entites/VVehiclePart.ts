import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity('v_vehicle_parts', { schema: 'vehicles' })
export class VVehiclePart {
  @PrimaryColumn({ name: 'id_vehicle_part' })
  idVehiclePart: string;

  @PrimaryColumn({ name: 'id_vehicle' })
  idVehicle: string;

  @PrimaryColumn({ name: 'id_part' })
  idPart: string;

  @Column({ name: 'vehicle_name' })
  vehicleName: string;

  @Column({ name: 'part_name' })
  partName: string;
}
