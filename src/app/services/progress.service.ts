import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {IBuilder} from '../shared/interface/ibuilder';
import {IConstruction} from "../shared/interface/iconstruction";

@Injectable()
export class ProgressService {

  private progressSubject: Subject<any> = new Subject();
  private completedProgressSubject: Subject<any> = new Subject();

  constructor() {}

  createProgress(obj: IConstruction) {
    this.progressSubject.next(obj);
  }

  addedProgress(): Observable<IConstruction> {
    return this.progressSubject;
  }

  onCompletedProgress(data: any) {
    this.completedProgressSubject.next(data);
  }

  onComplete(): Observable<IConstruction> {
    return this.completedProgressSubject;
  }

}
