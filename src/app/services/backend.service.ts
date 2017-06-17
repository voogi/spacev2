import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Resource} from "../shared/resource";
import {IPlanet} from "../shared/interface/iplanet";

@Injectable()
export class BackendService {

  private bURL: string = environment.backendURL;

  private headers: Headers = new Headers({
    'Content-Type' : 'application/json'
  });

  constructor( private http:Http ) { }

  //RESOURCE RELATED BACKEND REQUESTS

  /*
  * getPlayerResources
  *
  * systemId : egy adott naprendszer id alapján visszaadja a hozzá
  * tartozó resourceokat
  *
  * return Observable
  *
  * */
  getPlayerResources(systemId:string):Observable<Array<Resource>>{
    return this.http.get("/assets/resources.json").map( (res: Response) => res.json().payload);
  }

  //PLANET RELATED REQUEST
  getAllPlanetBySystem():Observable<Array<IPlanet>>{
    return this.http.get("/assets/planets.json").map( (res:Response) => res.json().payload )
  }

}
