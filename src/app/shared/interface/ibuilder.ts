import {ISlot} from './islot';
import {BuilderType} from '../builder-type.enum';
export interface IBuilder {

  item: any;
  slot?: ISlot;
  type: BuilderType;

}
