import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter';
import {IPlanet} from '../shared/interface/iplanet';
import {IConstruction} from '../shared/interface/iconstruction';
import {IResource} from '../shared/interface/iresource';
import {ISystem} from "../shared/interface/isystem";
import {Log, Level} from 'ng2-logger';

@Injectable()
export class BackendService {

  private bURL: string = environment.backendURL;

  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  private log = Log.create('backend', Level.ERROR, Level.WARN, Level.INFO);

  constructor(private http: Http) {
    this.log.color = "green";
  }

  /*SHIPS RELATED REQUESTS*/
  getAllShips() {
    return this.http.get('/assets/ships.json').map((res: Response) => res.json().payload);
  }

  /*BUILDING RELATED REQUESTS*/
  getAllBuilding() {
    return this.http.get('/assets/buildings.json').map((res: Response) => res.json().payload);
  }

  startConstruction(construction: IConstruction, planetId: number) {
    this.log.info('POST::/api/construction/planet/' + planetId);
    return this.http.post(this.bURL + '/api/construction/planet/' + planetId, construction, {headers: this.headers})
      .map(BackendService.extractData)
      .catch(BackendService.handleError);
  }

  getPlanetConstructions(planetId: number): Observable<Array<IConstruction>> {
    this.log.info('GET::/api/construction/planet/' + planetId);
    return this.http.get(this.bURL + '/api/construction/planet/' + planetId)
      .map(BackendService.extractData)
      .catch(BackendService.handleError);
  }

  getPlanetById(planetId: number): Observable<IPlanet> {
    this.log.info('GET::/api/planet/' + planetId);
    return this.http.get(this.bURL + '/api/planet/' + planetId)
      .map(BackendService.extractData);
  }

  getDiscoveredSystemByUser(userId: string): Observable<Array<ISystem>> {
    this.log.info('GET::/api/solarsystem/user/' + userId + '/discovered');
    return this.http.get(this.bURL + '/api/solarsystem/user/' + userId + '/discovered')
      .map(BackendService.extractData)
      .catch(BackendService.handleError);
  }

  getPlanetBySystemId(systemId: string): Observable<any> {
    this.log.info('GET::/api/solarsystem/' + systemId + '/planet');
    return this.http.get(this.bURL + '/api/solarsystem/' + systemId + '/planet')
      .map(BackendService.extractData)
      .catch(BackendService.handleError);
  }

  getPlayerResources(systemId: string): Observable<Array<IResource>> {
    this.log.info('GET::/api/solarsystem/' + systemId + '/resource');
    return this.http.get(this.bURL + '/api/solarsystem/'+ systemId +'/resource')
      .map(BackendService.extractData)
      .catch(BackendService.handleError);
  }

  static extractData(res: Response) {
    let body = res.json();
    return body.payload || { };
  }

  static handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
