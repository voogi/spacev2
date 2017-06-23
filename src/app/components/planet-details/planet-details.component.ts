import {Component, Input, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {BackendService} from "../../services/backend.service";
import {IShip} from "../../shared/interface/iship";

@Component({
  selector: 'space-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  @Input()
  public planet: IPlanet;
  public ships: Array<IShip> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {

    this.backendService.getPlayerFleets().subscribe( ships => {
      this.ships = ships;
    });

  }

}
