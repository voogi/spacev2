import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";

@Component({
  selector: 'space-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetListComponent implements OnInit {

  @Input()
  public planets: Array<IPlanet>;

  constructor() { }

  ngOnInit() {
  }

}
