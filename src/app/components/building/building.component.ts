import {Component, OnInit, Input} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";
import {BuilderService} from "../../services/builder.service";

@Component({
  selector: 'space-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  @Input()
  public planet:IPlanet;
  public slots:Array<number>;


  constructor(private builder: BuilderService) {
  }

  ngOnInit() {
    if(this.planet){
      this.slots = Array.from(Array(this.planet.slots),(x,i)=>i);
    }
  }

  onSelectSlot(){
    this.builder.selectedSlot()
  }

}
