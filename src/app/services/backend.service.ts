import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Resource} from '../shared/resource';
import {IPlanet} from '../shared/interface/iplanet';
import {IBuilding} from '../shared/interface/ibuilding';
import {IConstruction} from '../shared/interface/iconstruction';

@Injectable()
export class BackendService {

  private bURL: string = environment.backendURL;

  private headers: Headers = new Headers({
    'Content-Type' : 'application/json'
  });

  constructor( private http: Http ) { }

  /*BUILDING RELATED REQUEST*/
  getAllBuilding() {
    return this.http.get('/assets/buildings.json').map( (res: Response) => res.json().payload);
  }

  /*RESOURCE RELATED BACKEND REQUESTS*/
  getPlayerResources(systemId: string): Observable<Array<Resource>> {
    return this.http.get('/assets/resources.json').map( (res: Response) => res.json().payload);
  }

  /*PLANET RELATED REQUEST*/
  getAllPlanetBySystem(): Observable<Array<IPlanet>> {
    return this.http.get('/assets/planets.json').map( (res: Response) => res.json().payload );
  }

  /* törölni kell ha lesz rendes backend */
  loadPlanetsJSON() {
    this.getAllPlanetBySystem().subscribe(data => {
      for (const planet of data){
          localStorage.setItem('planet_' + planet.id, JSON.stringify(planet));
        }
    });
  }

  getPlanetById(planetId: number): IPlanet {
    return JSON.parse(localStorage.getItem('planet_' + planetId));
  }

  saveBuilding(building: IBuilding, planetId: number) {
    const planet: IPlanet = this.getPlanetById(planetId);
    planet.buildings.push(building);
    for (const construction of planet.constructions){
      if (construction.building.id === building.id) {
        planet.constructions.splice(planet.constructions.lastIndexOf(construction), 1);
      }
    }
    localStorage.setItem('planet_' + planetId, JSON.stringify(planet));
  }

  startConstruction(construction: IConstruction, planetId: number) {
    const planet: IPlanet = this.getPlanetById(planetId);
    construction.startTime = new Date().getMilliseconds();
    construction.endTime = construction.startTime + (construction.duration * 1000);
    planet.constructions.push(construction);
    localStorage.setItem('planet_' + planetId, JSON.stringify(planet));
  }

}
