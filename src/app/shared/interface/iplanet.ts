import {IBuilding} from "./ibuilding";
export interface IPlanet {
  id: number,
  name: string,
  size: number,
  img: string,
  slots: number,
  buildings: Array<IBuilding>
}
