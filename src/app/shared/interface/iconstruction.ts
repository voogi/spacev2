import {BuildingType} from '../building-type.enum';
export interface IConstruction {
  id?: number;
  constructionType: any;
  buildingType?: BuildingType;
  unitType?: any;
  shipType?: any;
  start?: number;
  end?: number;
  slot?: number;
}
