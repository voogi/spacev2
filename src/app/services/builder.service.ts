import { Injectable } from '@angular/core';
import {IBuilding} from "../shared/interface/ibuilding";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BuilderService {

  private subject: Subject<IBuilding>;
  private selectedSlotSubject: Subject<any>;

  constructor() {
    this.subject = new Subject();
    this.selectedSlotSubject = new Subject();
  }

  build(building:IBuilding){
    this.subject.next(building);
  }

  onBuild():Observable<IBuilding>{
    return this.subject
  }

  selectedSlot(){
    this.selectedSlotSubject.next();
  }

  onSelectedSlot():Observable<any>{
    return this.selectedSlotSubject
  }


}
