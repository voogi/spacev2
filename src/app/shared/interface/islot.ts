import {IBuilding} from './ibuilding';
export interface ISlot {
  position: number;
  building: IBuilding;
  isEmpty: boolean;
  isUnderConstruction?: boolean;
  level?: number;
  buildingId?: string | number;
}
