import {
    Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges,
    ChangeDetectorRef
} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';
import {ISlot} from '../../shared/interface/islot';
import {BackendService} from '../../services/backend.service';
import {IBuilder} from '../../shared/interface/ibuilder';
import {ProgressService} from '../../services/progress.service';
import {ConstructionType} from '../../shared/construction-type.enum';
import {Subscription} from 'rxjs/Subscription';
import {IConstruction} from '../../shared/interface/iconstruction';

@Component({
    selector: 'space-building-slots',
    templateUrl: './building-slots.component.html',
    styleUrls: ['./building-slots.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingSlotsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    public planet: IPlanet;

    @Output()
    public refreshSlot = new EventEmitter();

    public slots: Array<ISlot> = [];
    public building: IBuilding;
    public progressServiceSubscription: Subscription;

    constructor(private builder: BuilderService, private backendService: BackendService, private progressService: ProgressService, private cdRef: ChangeDetectorRef) {
        this.progressServiceSubscription = new Subscription();
    }

    ngOnChanges() {
        this.slots = [];
        for (let i = 0; i < this.planet.slots; i++) {
            const hasBuilding = this.planet.buildings.filter(data => data.slot === i)[0];
            const hasConstruction = this.planet.constructions.filter( data => data.slot === i )[0];
            if (hasBuilding) {
                this.slots.push({
                    isEmpty: false,
                    building: hasBuilding.type,
                    position: i,
                    level: hasBuilding.level,
                    buildingId: hasBuilding.id
                });
            }
            else if(hasConstruction){
              this.slots.push({
                isEmpty: false,
                building: null,
                position: i,
                isUnderConstruction : true
              });
            }
            else {
                this.slots.push({
                    isEmpty: true,
                    building: null,
                    position: i
                });
            }
        }
    }

    ngOnInit() {

        // when any queue completed data is a IBuilder obj
        this.progressServiceSubscription = this.progressService.onComplete().subscribe((construction: IConstruction) => {
            if (construction.constructionType === ConstructionType.BUILDING) {
                this.refreshSlot.emit(construction);
            }
        });

    }

    ngOnDestroy() {
        this.progressServiceSubscription.unsubscribe();
    }

    onSelectSlot(slot: ISlot) {
        if(slot.isUnderConstruction) return;
        if (slot.isEmpty) {
            this.builder.selectedSlot(slot);
        } else {
            this.builder.selectedBuilding(slot);
        }
    }

}
