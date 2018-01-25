import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBuilding} from '../../shared/interface/ibuilding';
import {BuilderService} from '../../services/builder.service';
import {ISlot} from '../../shared/interface/islot';
import {Subscription} from 'rxjs/Subscription';
import {BackendService} from '../../services/backend.service';
import {IBuilder} from '../../shared/interface/ibuilder';
import {ConstructionType} from '../../shared/construction-type.enum';
import {ResourceService} from "../../services/resource.service";

@Component({
    selector: 'space-builder',
    templateUrl: './building-builder.html',
    styleUrls: ['./building-builder.css']
})
export class BuildingBuilderComponent implements OnInit, OnDestroy {

    public buildings: any = {};
    public selectedBuilding: IBuilding;
    private selectedSlot: ISlot;
    private buildSub: Subscription = new Subscription();
    private allBuildingSub: Subscription = new Subscription();
    private resourceStatus: Subscription = new Subscription();
    public resources: any;
    public buildButtonDisabled: boolean = true;

    @Input()
    public visible: boolean = false;

    constructor(private builder: BuilderService, private backendService: BackendService, private resourceService: ResourceService) {
    }

    onBuild(item:any) {
        const builder: IBuilder = {
            type: ConstructionType.BUILDING,
            slot: this.selectedSlot,
            item: item.value
        };
        this.builder.build(builder);
        this.visible = false;
    }

    onCancel() {
        this.visible = false;
    }

    ngOnInit() {

        this.buildSub = this.builder.onSelectedSlot().subscribe((slot) => {

            this.selectedSlot = slot;

            this.allBuildingSub = this.backendService.getAllBuilding().subscribe(buildings => {
                this.buildings = buildings;
                this.visible = true;

            });

        });

        this.resourceStatus = this.resourceService.getResourceStatus().subscribe( data => {
            this.resources = data;
        });

    }

    ngOnDestroy() {
        this.buildSub.unsubscribe();
        this.allBuildingSub.unsubscribe();
        this.resourceStatus.unsubscribe();
    }


}
