import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {IShip} from "../../shared/interface/iship";

@Component({
  selector: 'space-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {

  @Input()
  public planet: IPlanet;

  @Input()
  public ssId: string;

  public ships: Array<IShip> = [];

    constructor() {
  }

  ngOnInit() {
      // this.backendService.getSystemShips(this.ssId).subscribe( (data:Array<IShip>) => {
      //   this.ships = data.map( x => x.shipType );
      // });
  }

  ngOnDestroy(): void {
  }
}
