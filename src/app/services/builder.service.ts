import { Injectable } from '@angular/core';
import {IBuilding} from "../shared/interface/ibuilding";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BuilderService {

  private subject: Subject<IBuilding>;

  constructor() {
    this.subject = new Subject();
  }

  build(building:IBuilding){
    this.subject.next(building);
  }

  onBuild():Observable<IBuilding>{
    return this.subject
  }


}
