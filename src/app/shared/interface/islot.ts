import {IBuilding} from "./ibuilding";
export interface ISlot {
  id: number,
  position: number,
  building: IBuilding,
  isEmpty:boolean
}
