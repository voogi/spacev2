import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  @Input() visible: boolean;

  public productBuildings: Array<any> = [];
  public armyBuildings: Array<any> = [];
  public defenseBuildings: Array<any> = [];
  public selectedBuilding: any;

  constructor() {

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

  onSelectBuilding(building:any){
    this.selectedBuilding = building;
  }

  ngOnInit() {
  }

}
