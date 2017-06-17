import {IBuilding} from "./ibuilding";
import {IConstruction} from "./iconstruction";
export interface IPlanet {
  id: number,
  name: string,
  size: number,
  img: string,
  slots: number,
  buildings: Array<IBuilding>
  constructions: Array<IConstruction>
}
