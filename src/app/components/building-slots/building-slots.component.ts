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
export class BuildingSlotsComponent implements OnInit, OnDestroy {

    @Input()
    public planet: IPlanet;

    @Output()
    public constructionDone = new EventEmitter();

    public slots: Array<ISlot> = [];
    public selectedSlot: ISlot;
    public building: IBuilding;
    public onBuildSubscription: Subscription;
    public progressServiceSubscription: Subscription;

    constructor(private builder: BuilderService, private backendService: BackendService, private progressService: ProgressService, private cdRef: ChangeDetectorRef) {
        this.onBuildSubscription = new Subscription();
        this.progressServiceSubscription = new Subscription();
    }

    ngOnChanges() {
        this.slots = [];
        for (let i = 0; i < this.planet.slots; i++) {
            const hasBuilding = this.planet.buildings.filter(data => data.slot === i)[0];
            if (hasBuilding) {

                this.slots.push({
                    isEmpty: false,
                    building: hasBuilding.type,
                    position: i,
                    level: hasBuilding.level,
                    buildingId: hasBuilding.id
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

        this.onBuildSubscription = this.builder.onBuild().subscribe((builder: IBuilder) => {

            if (builder.type === ConstructionType.BUILDING) {

                this.backendService.startConstruction({
                    buildingType: builder.item,
                    constructionType: ConstructionType.BUILDING,
                    slot: builder.slot.position
                }, this.planet.id).subscribe((construction: IConstruction) => {
                    this.progressService.createProgress(construction);
                    this.selectedSlot.isUnderConstruction = true;
                });

                this.selectedSlot.isEmpty = false;

            }
        });

        // when any queue completed data is a IBuilder obj
        this.progressServiceSubscription = this.progressService.onComplete().subscribe((construction: IConstruction) => {
            if (construction.constructionType === ConstructionType.BUILDING) {
                this.constructionDone.emit(construction);
            }
        });

    }

    ngOnDestroy() {
        this.onBuildSubscription.unsubscribe();
        this.progressServiceSubscription.unsubscribe();
    }

    onSelectSlot(slot: ISlot) {
        if (slot.isEmpty) {
            this.builder.selectedSlot(slot);
            this.selectedSlot = slot;
        } else {
            this.builder.selectedBuilding(slot);
        }
    }

}
