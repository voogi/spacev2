import {IPlanet} from "./interface/iplanet";
import {BuildingType} from "./building-type.enum";
export class Building {
  constructor(
    public id: number,
    public planet: IPlanet,
    public type: BuildingType,
    public slotRow: number,
    public slotCell: number
  ){}
}
