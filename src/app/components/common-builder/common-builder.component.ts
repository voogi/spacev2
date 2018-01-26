import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ProgressService} from '../../services/progress.service';
import {BuilderService} from '../../services/builder.service';
import {IShip} from '../../shared/interface/iship';
import {ConstructionType} from '../../shared/construction-type.enum';
import {IBuilder} from '../../shared/interface/ibuilder';
import {Subscription} from 'rxjs/Subscription';
import {ISlot} from "../../shared/interface/islot";
import {IPlanet} from "../../shared/interface/iplanet";

@Component({
    selector: 'space-common-builder',
    templateUrl: './common-builder.component.html',
    styleUrls: ['./common-builder.component.css']
})
export class CommonBuilderComponent implements OnInit, OnDestroy {

    public buildingItems: Array<any> = [];
    public visible: boolean = false;
    public onSelectedBuildingSub: Subscription;
    public onCompleteSub: Subscription;
    public getAllShipSub: Subscription;
    public infoSub: Subscription;
    public upgradeSub: Subscription;
    public deconstructSub: Subscription;
    public title: string = "";
    public subtitle: string = "";
    public item: any;
    public buildingId: string | number;

    public unitMap : Map<string,string> = new Map();

    @Output()
    public refreshSlot = new EventEmitter();

    constructor(private backendService: BackendService,
                private progressService: ProgressService,
                private builderService: BuilderService) {
        this.onSelectedBuildingSub = new Subscription();
        this.onCompleteSub = new Subscription();
        this.getAllShipSub = new Subscription();
        this.infoSub = new Subscription();
        this.upgradeSub = new Subscription();
        this.deconstructSub = new Subscription();
    }

    onUnitBuild(item:any){
      this.unitMap.set(item.item.kind,item.value);
    }

    onBuild() {
        const item: IBuilder = {
            type: ConstructionType.SHIP,
            item: this.unitMap,
            id: this.item.id
        };
        this.builderService.build(item);
        this.visible = false;
    }

    onCancel() {
        this.visible = false;
    }

    ngOnInit(): void {
        this.onSelectedBuildingSub = this.builderService.onSelectedBuilding().subscribe((slot: ISlot) => {
            this.infoSub = this.backendService.getBuildingInfo(slot.buildingId).subscribe(data => {
                this.item = data;
                this.buildingItems = data.buildingItems;
                this.title = data.type.name;
                this.subtitle = data.type.description;
                this.visible = true;
            });
        });
    }

    onUpgrade() {
        this.upgradeSub = this.backendService.upgradeBuilding(this.item.id).subscribe(data => console.log(data));
    }

    onDeconstruct(): void {
        this.builderService.deconstruct(this.item.id);
        this.visible = false;
    }

    ngOnDestroy(): void {
        this.onSelectedBuildingSub.unsubscribe();
        this.onCompleteSub.unsubscribe();
        this.getAllShipSub.unsubscribe();
        this.infoSub.unsubscribe();
        this.deconstructSub.unsubscribe();
    }
}
