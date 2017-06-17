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
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barracsrgsrgsrgk",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
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
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
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
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
        superPlastic: 30,
        time: 90
      },
      {
        name: "barrack",
        desc: "barrack desc",
        tooltip: "barrack tooltip",
        energy: 20,
        titanium : 40,
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
