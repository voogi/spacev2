import { Injectable } from '@angular/core';
import {Planet} from "../shared/planet";

@Injectable()
export class DummyService {

  public selectedPlanet: Planet;

  constructor() {
  }

}
