import {Component, Input, OnInit} from '@angular/core';
import {IBuilding} from "../../shared/interface/ibuilding";
import {BuilderService} from "../../services/builder.service";

@Component({
  selector: 'space-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  public productBuildings: Array<IBuilding> = [];
  public armyBuildings: Array<IBuilding> = [];
  public defenseBuildings: Array<IBuilding> = [];
  public selectedBuilding: any;

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
        time: 90
      },
      {
        id: 2,
        name: "barracsrgsrgsrgk",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 3,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 4,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 5,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 6,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 7,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        id: 8,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
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
        time: 90
      },
      {
        id: 10,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
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
        time: 90
      },
      {
        id: 12,
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium: 40,
        superPlastic: 30,
        time: 90
      }
    ];
    this.selectedBuilding = this.productBuildings[0];

  }

  onSelectBuilding(building:IBuilding){
    this.selectedBuilding = building;
  }

  onBuild(){
    this.builder.build(this.selectedBuilding);
    this.visible = false;
  }

  onCancel(){
    this.visible = false;
  }

  ngOnInit() {

    this.builder.onSelectedSlot().subscribe( (slot) => {
      this.visible = true;
    });

  }

}
