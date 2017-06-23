import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ISlot} from '../shared/interface/islot';
import {ProgressService} from './progress.service';
import {IBuilder} from '../shared/interface/ibuilder';
import {IBuilding} from '../shared/interface/ibuilding';
import {IShip} from '../shared/interface/iship';

@Injectable()
export class BuilderService {

  private subject: Subject<IBuilder>;
  private selectedSlotSubject: Subject<ISlot>;
  private selectedBuildingSubject: Subject<IBuilding>;

  constructor(private progressService: ProgressService) {
    this.subject = new Subject();
    this.selectedSlotSubject = new Subject();
    this.selectedBuildingSubject = new Subject();
  }

  build(builder: IBuilder) {
    this.subject.next(builder);
    this.progressService.createProgress(builder);
  }

  onBuild(): Observable<IBuilder> {
    return this.subject;
  }

  selectedSlot(slot: ISlot) {
    this.selectedSlotSubject.next(slot);
  }

  onSelectedSlot(): Observable<ISlot> {
    return this.selectedSlotSubject;
  }

  selectedBuilding(building: IBuilding) {
    this.selectedBuildingSubject.next(building);
  }

  onSelectedBuilding(): Observable<IBuilding> {
    return this.selectedBuildingSubject;
  }

}
