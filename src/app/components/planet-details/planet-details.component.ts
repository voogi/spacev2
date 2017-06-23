import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {BackendService} from "../../services/backend.service";
import {IShip} from "../../shared/interface/iship";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'space-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {

  @Input()
  public planet: IPlanet;
  public ships: Array<IShip> = [];

  private fleetsSub: Subscription;

  constructor(private backendService: BackendService) {
    this.fleetsSub = new Subscription();
  }

  ngOnInit() {

    this.backendService.getPlayerFleets().subscribe( ships => {
      this.ships = ships;
    });

  }

  ngOnDestroy(): void {
    this.fleetsSub.unsubscribe();
  }
}
