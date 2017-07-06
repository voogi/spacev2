import {BuildingType} from '../building-type.enum';
export interface IBuilding {

  id: number;
  name: string;
  desc: string;
  tooltip: string;
  energy: number;
  titanium: number;
  superPlastic: number;
  time: number;
  slot?: number;
  buildingType: BuildingType;
  type: any;

}
