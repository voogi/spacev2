import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBuilding} from "../../shared/interface/ibuilding";
import {BuilderService} from "../../services/builder.service";
import {ISlot} from "../../shared/interface/islot";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'space-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit,OnDestroy {

  public productBuildings: Array<IBuilding> = [];
  public armyBuildings: Array<IBuilding> = [];
  public defenseBuildings: Array<IBuilding> = [];
  public selectedBuilding: any;
  private selectedSlot: ISlot;
  private buildSub: Subscription = new Subscription();

  @Input()
  public visible:boolean = false;

  constructor(private builder:BuilderService) {

    this.productBuildings = [
      {
        id: 1,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 2,
        name: "barracsrgsrgsrgk",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 4
      },
      {
        id: 3,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 4,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 5,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 6,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 7,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 8,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      }
    ];
    this.armyBuildings = [
      {
        id: 9,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 10,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      }
    ];
    this.defenseBuildings = [
      {
        id: 11,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 20
      },
      {
        id: 12,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium: 40,
        superPlastic: 30,
        time: 20
      }
    ];
    this.selectedBuilding = this.productBuildings[0];

  }

  onSelectBuilding(building:IBuilding){
    this.selectedBuilding = building;
  }

  onBuild(){
    this.builder.build({ building : this.selectedBuilding, slot : this.selectedSlot });
    this.visible = false;
  }

  onCancel(){
    this.visible = false;
  }

  ngOnInit() {

    this.buildSub = this.builder.onSelectedSlot().subscribe( (slot) => {
      this.selectedSlot = slot;
      this.visible = true;
    });

  }

  ngOnDestroy(){
    this.buildSub.unsubscribe()
  }

}
