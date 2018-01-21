import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ProgressService} from '../../services/progress.service';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';
import {IShip} from '../../shared/interface/iship';
import { ConstructionType} from '../../shared/construction-type.enum';
import {IBuilder} from '../../shared/interface/ibuilder';
import {Subscription} from 'rxjs/Subscription';
import {IConstruction} from '../../shared/interface/iconstruction';
import {BuildingType} from "../../shared/building-type.enum";
import {ISlot} from "../../shared/interface/islot";

@Component({
  selector: 'space-common-builder',
  templateUrl: './common-builder.component.html',
  styleUrls: ['./common-builder.component.css']
})
export class CommonBuilderComponent implements OnInit, OnDestroy {

  public ships: Array<IShip> = [];
  public visible: boolean = false;
  public selectedItem: IShip;
  public onSelectedBuildingSub: Subscription;
  public onCompleteSub: Subscription;
  public getAllShipSub: Subscription;
  public infoSub: Subscription;
  public title: string = "";
  public subtitle: string = "";
  public level: number = 1;

  constructor(
      private backendService: BackendService,
      private progressService: ProgressService,
      private builderService: BuilderService)
  {
    this.onSelectedBuildingSub = new Subscription();
    this.onCompleteSub = new Subscription();
    this.getAllShipSub = new Subscription();
    this.infoSub = new Subscription();
  }

  onSelectShip(ship: IShip) {
    this.selectedItem = ship.shipType;
  }

  onBuild() {

    if (this.selectedItem === undefined) { return; }

    const item: IBuilder = {
      type  : ConstructionType.SHIP,
      item : this.selectedItem.kind
    };
    this.builderService.build(item);
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

  ngOnInit(): void {

    this.onSelectedBuildingSub = this.builderService.onSelectedBuilding().subscribe( (slot: ISlot) => {
      this.level = slot.level;
      this.infoSub = this.backendService.getBuildingInfo(slot.buildingId).subscribe( data => {
        if(slot.building.value === BuildingType.SHIPYARD) {
            this.ships = data.buildingItems;
            this.title = "Shipyard";
            this.subtitle = "Available Ships";
            this.visible = true;
        }
      });
    });

    // this.onCompleteSub = this.progressService.onComplete().subscribe( (construction: IConstruction) => {
    //   if (construction.constructionType === ConstructionType.SHIP) {
    //   }
    // });

  }


  ngOnDestroy(): void {
    this.onSelectedBuildingSub.unsubscribe();
    this.onCompleteSub.unsubscribe();
    this.getAllShipSub.unsubscribe();
    this.infoSub.unsubscribe();
  }
}
