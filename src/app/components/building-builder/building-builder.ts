import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBuilding} from '../../shared/interface/ibuilding';
import {BuilderService} from '../../services/builder.service';
import {ISlot} from '../../shared/interface/islot';
import {Subscription} from 'rxjs/Subscription';
import {BackendService} from '../../services/backend.service';
import {IBuilder} from '../../shared/interface/ibuilder';
import {ConstructionType} from '../../shared/construction-type.enum';

@Component({
  selector: 'space-builder',
  templateUrl: './building-builder.html',
  styleUrls: ['./building-builder.css']
})
export class BuildingBuilderComponent implements OnInit, OnDestroy {

  public buildings: any = {};
  public producerBuildings: Array<IBuilding> = [];
  public developmentBuildings: Array<IBuilding> = [];
  public militaryBuildings: Array<IBuilding> = [];
  public utilityBuildings: Array<IBuilding> = [];
  public selectedBuilding: IBuilding;
  private selectedSlot: ISlot;
  private buildSub: Subscription = new Subscription();
  public availableBuildings: Array<any> = [];
  private allBuildingSub: Subscription;

  @Input()
  public visible: boolean = false;

  constructor(private builder: BuilderService, private backendService: BackendService) {
  }

  onSelectBuilding(building: IBuilding) {
    this.selectedBuilding = building;
    this.allBuildingSub = new Subscription();
  }

  onBuild() {

    if (this.selectedBuilding === undefined) { return; }

    const item: IBuilder = {
      type: ConstructionType.BUILDING,
      slot: this.selectedSlot,
      item: this.selectedBuilding.type
    };
    this.builder.build(item);
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

  ngOnInit() {

    this.allBuildingSub = this.backendService.getAllBuilding().subscribe( buildings => {

      this.buildings = buildings;
      this.buildings.forEach( building => {
        switch ( building.baseType ) {
          case 'MILITARY':
            this.militaryBuildings.push(building);
            break;
          case 'PRODUCER':
            this.producerBuildings.push(building);
            break;
          case 'RESEARCH':
            this.developmentBuildings.push(building);
            break;
          case 'UTILITY':
            this.utilityBuildings.push(building);
            break;
        }
      });
      this.availableBuildings.push({
        name : 'Producer buildings',
        buildings : this.producerBuildings
      });
      this.availableBuildings.push({
        name : 'Military buildings',
        buildings : this.militaryBuildings
      });
      this.availableBuildings.push({
        name : 'Utility buildings',
        buildings : this.utilityBuildings
      });
      this.availableBuildings.push({
        name : 'Development buildings',
        buildings : this.developmentBuildings
      });
    });

    this.buildSub = this.builder.onSelectedSlot().subscribe( (slot) => {
      this.selectedSlot = slot;
      this.visible = true;
    });

  }

  ngOnDestroy() {
    this.buildSub.unsubscribe();
    this.allBuildingSub.unsubscribe();
  }

}
