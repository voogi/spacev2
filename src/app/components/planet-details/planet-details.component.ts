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

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
