import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBuilding} from '../../shared/interface/ibuilding';
import {BuilderService} from '../../services/builder.service';
import {ISlot} from '../../shared/interface/islot';
import {Subscription} from 'rxjs/Subscription';
import {BackendService} from '../../services/backend.service';
import {IBuilder} from '../../shared/interface/ibuilder';
import {BuilderType} from '../../shared/builder-type.enum';

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
  public defensiveBuildings: Array<IBuilding> = [];
  public selectedBuilding: any;
  private selectedSlot: ISlot;
  private buildSub: Subscription = new Subscription();
  public availableBuildings: Array<any> = [];

  @Input()
  public visible: boolean = false;

  constructor(private builder: BuilderService, private backendService: BackendService) {
  }

  onSelectBuilding(building: IBuilding) {
    this.selectedBuilding = building;
  }

  onBuild() {
    const item: IBuilder = {
      type: BuilderType.BULDING,
      slot: this.selectedSlot,
      item: this.selectedBuilding
    };
    this.builder.build(item);
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

  ngOnInit() {

    this.backendService.getAllBuilding().subscribe( buildings => {
      this.buildings = buildings;
      this.producerBuildings = this.buildings.producer;
      this.militaryBuildings = this.buildings.military;
      this.defensiveBuildings = this.buildings.defensive;
      this.developmentBuildings = this.buildings.development;

      this.availableBuildings.push({
        name : 'Producer buildings',
        buildings : this.producerBuildings
      });
      this.availableBuildings.push({
        name : 'Military buildings',
        buildings : this.militaryBuildings
      });
      this.availableBuildings.push({
        name : 'Defensive buildings',
        buildings : this.defensiveBuildings
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
  }

}
