import { Injectable } from '@angular/core';
import {IPlanet} from '../shared/interface/iplanet';

@Injectable()
export class RoutedDataService {

  public routedPlanet: IPlanet;

  constructor() { }

}
