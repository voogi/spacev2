import {ISlot} from './islot';
import {ConstructionType} from "../construction-type.enum";
export interface IBuilder {

  item: any;
  slot?: ISlot;
  type: ConstructionType;
  id?: string;

}
