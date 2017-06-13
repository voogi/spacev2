import {Planet} from "./planet";
import {BuildingType} from "./building-type.enum";
export class Building {
  constructor(
    public id: number,
    public planet: Planet,
    public type: BuildingType,
    public slotRow: number,
    public slotCell: number
  ){}
}
