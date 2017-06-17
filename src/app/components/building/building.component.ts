import {Component, OnInit, Input, SimpleChange, OnChanges} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";

@Component({
  selector: 'space-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit, OnChanges {

  @Input()
  public planet:IPlanet;
  public slots:Array<number>;


  constructor() {
  }

  ngOnChanges(changes: {[planet: string]: SimpleChange}) {
    if(changes.planet.currentValue){
      this.slots = Array.from(Array(this.planet.slots),(x,i)=>i);
    }
  }

  ngOnInit() {
  }

}
