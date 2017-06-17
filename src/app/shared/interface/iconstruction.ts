import {IBuilding} from "./ibuilding";
export interface IConstruction {

  building: IBuilding,
  duration: number,
  startTime?: number,
  endTime?: number
}
