import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class ProgressService {

  private progressSubject: Subject<any> = new Subject();
  private completedProgressSubject: Subject<any> = new Subject();

  constructor() {}

  createProgress(obj: any) {
    this.progressSubject.next(obj);
  }

  addedProgress(): Observable<any> {
    return this.progressSubject;
  }

  onCompletedProgress(data: any) {
    this.completedProgressSubject.next(data);
  }

  onComplete(): Observable<any> {
    return this.completedProgressSubject;
  }

}
