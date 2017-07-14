import {BuildingType} from '../building-type.enum';
export interface IBuilding {

  id: number;
  name: string;
  buildingTime: number;
  slot?: number;
  buildingType: BuildingType;
  type: any;
  baseType: any;
  crewCost: number;
  description: string;
  energyCost: number;
  modifierRules: any;
  titaniumCost: number;
  value: string;

}
