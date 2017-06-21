import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBuilding} from '../../shared/interface/ibuilding';
import {BuilderService} from '../../services/builder.service';
import {ISlot} from '../../shared/interface/islot';
import {Subscription} from 'rxjs/Subscription';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'space-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit, OnDestroy {

  public buildings: any = {};
  public producerBuildings: Array<IBuilding> = [];
  public developmentBuildings: Array<IBuilding> = [];
  public militaryBuildings: Array<IBuilding> = [];
  public defensiveBuildings: Array<IBuilding> = [];
  public selectedBuilding: any;
  private selectedSlot: ISlot;
  private buildSub: Subscription = new Subscription();

  @Input()
  public visible: boolean = false;

  constructor(private builder: BuilderService, private backendService: BackendService) {
  }

  onSelectBuilding(building: IBuilding) {
    this.selectedBuilding = building;
  }

  onBuild() {
    this.builder.build({ building : this.selectedBuilding, slot : this.selectedSlot });
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