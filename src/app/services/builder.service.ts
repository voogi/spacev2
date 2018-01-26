import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ISlot} from '../shared/interface/islot';
import {ProgressService} from './progress.service';
import {IBuilder} from '../shared/interface/ibuilder';
import {IBuilding} from '../shared/interface/ibuilding';
import {IShip} from '../shared/interface/iship';
import {ConstructionType} from "../shared/construction-type.enum";
import {IConstruction} from "../shared/interface/iconstruction";
import {BackendService} from "./backend.service";
import {IPlanet} from "../shared/interface/iplanet";

@Injectable()
export class BuilderService {

    private subject: Subject<any> = new Subject<any>();
    private selectedSlotSubject: Subject<{ slot: ISlot, planet: IPlanet }> = new Subject<{ slot: ISlot, planet: IPlanet }>();
    private selectedBuildingSubject: Subject<ISlot> = new Subject<ISlot>();

    constructor(private progressService: ProgressService, private backendService: BackendService) {
    }

    build(builder: IBuilder) {
        if (builder.type === ConstructionType.BUILDING) {
            this.backendService.startBuildingConstruction({
                buildingType: builder.item,
                constructionType: ConstructionType.BUILDING,
                slot: builder.slot.position
            }, builder.planetId).subscribe((construction: IConstruction) => {
                this.subject.next(construction);
                this.progressService.createProgress(construction);
            });
        }
        if (builder.type === ConstructionType.SHIP) {
            this.backendService.startUnitConstruction({
                buildList: this.convertMapToObj(builder.item)
            }, builder.id).subscribe((construction: IConstruction) => {
                this.progressService.createProgress(construction);
            });
        }

        if (builder.type === ConstructionType.RESEARCH) {
            //TODO
        }

        if (builder.type === ConstructionType.UPGRADE) {
            //TODO
        }
    }

    deconstruct(id: string | number) {
        this.backendService.deconstructBuilding(id).subscribe(data => {
            // this.refreshSlot.emit(data);
            this.subject.next(data);
        });
    }

    convertMapToObj(strMap: any) {
        let obj = Object.create(null);
        strMap.forEach((v, k) => obj[k] = v);
        return obj;
    }

    refresh(): Observable<any> {
        return this.subject;
    }

    selectedSlot(slot: ISlot, planet: IPlanet) {
        this.selectedSlotSubject.next({
            slot: slot,
            planet: planet
        });
    }

    onSelectedSlot(): Observable<{ slot: ISlot, planet: IPlanet }> {
        return this.selectedSlotSubject;
    }

    selectedBuilding(slot: ISlot) {
        this.selectedBuildingSubject.next(slot);
    }

    onSelectedBuilding(): Observable<any> {
        return this.selectedBuildingSubject;
    }

}
