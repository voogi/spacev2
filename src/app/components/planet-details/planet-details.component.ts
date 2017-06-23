import {Component, Input, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';

@Component({
  selector: 'space-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  @Input()
  public planet: IPlanet;

  constructor() { }

  ngOnInit() {
  }

}
