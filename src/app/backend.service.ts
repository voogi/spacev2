import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.prod";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

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
  getPlayerResources(systemId:string):Observable<any>{
    return this.http.get("/assets/resources.json").map( (res: Response) => res.json());
  }

}
