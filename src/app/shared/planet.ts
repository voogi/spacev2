import {Building} from "./building";
export class Planet {
  constructor(
    public id: number,
    public name: string,
    public size: number,
    public background: string,
    public slots: number,
    public buildings: Array<Building>
  ){}
}
