import { Brand } from './Brand';
import { Model } from './Model';
import { Part } from './Part';
import { PartPhoto } from './PartPhoto';
import { Vehicle } from './Vehicle';
import { VehiclePart } from './VehiclePart';

export * from './Brand';
export * from './Model';
export * from './Vehicle';
export * from './Part';
export * from './PartPhoto';
export * from './VehiclePart';

export const entities = [Brand, Model, Part, PartPhoto, Vehicle, VehiclePart];
