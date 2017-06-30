import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {IPlanet} from '../shared/interface/iplanet';
import {IConstruction} from '../shared/interface/iconstruction';
import {IResource} from '../shared/interface/iresource';
import {IShip} from "../shared/interface/iship";
import {ISystem} from "../shared/interface/isystem";

@Injectable()
export class BackendService {

  private bURL: string = environment.backendURL;

  private headers: Headers = new Headers({
    'Content-Type' : 'application/json'
  });

  constructor( private http: Http ) { }

  /*SHIPS RELATED REQUESTS*/
  getAllShips() {
    return this.http.get('/assets/ships.json').map( (res: Response) => res.json().payload );
  }

  /*BUILDING RELATED REQUESTS*/
  getAllBuilding() {
    return this.http.get('/assets/buildings.json').map( (res: Response) => res.json().payload);
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
          localStorage.setItem('playerShips', JSON.stringify([]));
        }
    });
  }


  saveBuilding(planet: any): Observable<IPlanet> {
    return this.http.post('http://localhost:8080/api/planet/save', planet, { headers : this.headers })
      .map( (data: Response) => data.json().payload );
  }

  saveShip(ship: IShip) {
    const playerShips = JSON.parse( localStorage.getItem('playerShips') );
    playerShips.push(ship);
    localStorage.setItem('playerShips', JSON.stringify(playerShips));
  }

  getPlayerFleets(): Observable<any> {
    return Observable.create( observer => {
      observer.next(  JSON.parse(localStorage.getItem('playerShips')) );
      observer.complete();
    });
  }

//   @RestController
//   @RequestMapping("/api/construction")
//   public class ConstructionController {
//
//   @Autowired
//   private ConstructionService constructionService;
//
//   @Autowired
//   private ConstructionConverter constructionConverter;
//
//   @RequestMapping(value = "planet/{planetId}", method = RequestMethod.POST)
//   @ResponseBody
//   public Response saveConstruction(@PathVariable("planetId") Long planetId,
//   @RequestBody ConstructionDto constructionDto) throws SpaceException {
//   Construction construction = constructionService.constructBuilding(constructionDto.getBuildingType(), planetId);
//   return Response.createOKResponse( constructionConverter.convertToDto(construction) );
// }

  startConstruction(construction: IConstruction, planetId: number) {
      return this.http.post(this.bURL + '/api/construction/planet/' + planetId, construction, { headers: this.headers })
          .map( (resp: Response) => resp.json().payload );
  }

  getPlanetConstructions(planetId: number): Observable<Array<IConstruction>> {
    return this.http.get(this.bURL + '/api/construction/planet/' + planetId)
        .map( (resp: Response) => resp.json().payload );
  }

  getPlanetById(planetId: number): Observable<IPlanet> {
    return this.http.get('http://localhost:8080/api/planet/' + planetId)
      .map( (resp: Response) => resp.json().payload );
  }


  getDiscoveredSystemByUser(userId: string): Observable<Array<ISystem>> {
    return this.http.get('http://localhost:8080/api/solarsystem/user/' + userId + '/discovered')
        .map( (json: Response) => json.json().payload );
  }

  getPlanetBySystemId(systemId: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/solarsystem/' + systemId + '/planet').map( (data: Response) => data.json().payload );
  }

  getPlayerResources(systemId: string): Observable<Array<IResource>> {
    return this.http.get('http://localhost:8080/api/solarsystem/194067/resource').map( (res: Response) => res.json().payload);
  }

}
