import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter';
import {IPlanet} from '../shared/interface/iplanet';
import {IConstruction} from '../shared/interface/iconstruction';
import {IResource} from '../shared/interface/iresource';
import {ISystem} from "../shared/interface/isystem";
import {Log, Level} from 'ng2-logger';
import {IUser} from "../shared/interface/iuser";
import {IOffer} from "../shared/interface/ioffer";
import {IBuilding} from "../shared/interface/ibuilding";
import {IShip} from "../shared/interface/iship";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IResponse} from "../shared/interface/iresponse";

@Injectable()
export class BackendService {

  private bURL: string = environment.backendURL;

  private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  private log = Log.create('backend', Level.ERROR, Level.WARN, Level.INFO);

  // static handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  constructor(private http: HttpClient) {
    this.log.color = 'green';
  }

  /*SHIPS RELATED REQUESTS*/
  getAllShips() {
    return this.http.get(this.bURL + '/api/enum/ShipType')
      .map( (data:any) => data.payload);
  }

  /*BUILDING RELATED REQUESTS*/
  getAllBuilding(): Observable<Array<IBuilding>> {
    return this.http.get<Array<IBuilding>>(this.bURL + '/api/enum/BuildingType')
      .map( (data:any) => data.payload);
  }

  startUnitConstruction(construction: IConstruction, buildingId: string | number) {
    this.log.info('POST::/api/construction/building/' + buildingId + '/ship');
    return this.http.post(this.bURL + '/api/construction/building/' + buildingId + '/ship', construction, {headers: this.headers})
      .map( (data:any) => data.payload);
  }

  startBuildingConstruction(construction: IConstruction, planetId: number) {
    this.log.info('POST::/api/construction/planet/' + planetId + 'building');
    return this.http.post(this.bURL + '/api/construction/planet/' + planetId + "/building", construction, {headers: this.headers})
      .map( (data:any) => data.payload);
  }

  getPlanetConstructions(planetId: number): Observable<Array<IConstruction>> {
    this.log.info('GET::/api/construction/planet/' + planetId);
    return this.http.get<Array<IConstruction>>(this.bURL + '/api/construction/planet/' + planetId)
      .map( (data:any) => data.payload);
  }

  getPlanetById(planetId: number): Observable<IPlanet> {
    this.log.info('GET::/api/planet/' + planetId);
    return this.http.get<IPlanet>(this.bURL + '/api/planet/' + planetId)
      .map( (data:any) => data.payload);
  }

  getDiscoveredSystemByUser(userId: string): Observable<Array<ISystem>> {
    this.log.info('GET::/api/solarsystem/user/' + userId + '/discovered');
    return this.http.get<Array<ISystem>>(this.bURL + '/api/solarsystem/user/' + userId + '/discovered')
      .map( (data:any) => data.payload);
  }

  getPlanetBySystemId(systemId: string): Observable<any> {
    this.log.info('GET::/api/solarsystem/' + systemId + '/planet');
    return this.http.get<any>(this.bURL + '/api/solarsystem/' + systemId + '/planet')
      .map( (data:any) => data.payload);
  }

  getPlayerResources(systemId: string): Observable<Array<IResource>> {
    this.log.info('GET::/api/solarsystem/' + systemId + '/resource');
    return this.http.get<Array<IResource>>(this.bURL + '/api/solarsystem/' + systemId + '/resource')
      .map( (data:any) => data.payload);
  }

  getAllUsers(): Observable<Array<IUser>> {
    this.log.info('GET::/api/user/all');
    return this.http.get<Array<IUser>>(this.bURL + '/api/user/all')
      .map( (data:any) => data.payload);
  }

  getAllOffers(): Observable<Array<IOffer>> {
    this.log.info('GET::/api/trade/offers');
    return this.http.get<Array<IOffer>>(this.bURL + '/api/trade/offers')
      .map( (data:any) => data.payload);
  }

  getSystemShips(ssId: string): Observable<Array<IShip>> {
    this.log.info('GET::/api/solarsystem/' + ssId + '/ship');
    return this.http.get<Array<IShip>>(this.bURL + '/api/solarsystem/' + ssId + '/ship')
      .map( (data:any) => data.payload);
  }

  getBuildingInfo(buildId: string | number): Observable<any> {
    this.log.info('GET::/api/building/' + buildId);
    return this.http.get<any>(this.bURL + '/api/building/' + buildId)
      .map( (data:any) => data.payload);
  }

  upgradeBuilding(buildId: string | number): Observable<any> {
    this.log.info('GET::/api/building/' + buildId + "/upgrade");
    return this.http.get<any>(this.bURL + '/api/building/' + buildId + '/upgrade')
      .map( (data:any) => data.payload);
  }

  deconstructBuilding(buildId: string | number): Observable<any> {
    this.log.info('DELETE::/api/building/' + buildId);
    return this.http.delete<any>(this.bURL + '/api/building/' + buildId)
      .map( (data:any) => data.payload);
  }

}
