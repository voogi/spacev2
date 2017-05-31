import { Component, OnInit } from '@angular/core';
import {Planet} from "../shared/planet";

@Component({
  selector: 'space-solarsystem',
  templateUrl: './solarsystem.component.html',
  styleUrls: ['./solarsystem.component.css']
})
export class SolarsystemComponent implements OnInit {

  public planets: Array<Planet>;
  public activePlanet: Planet;

  constructor() { }

  ngOnInit() {
    this.planets = [
      new Planet(1, "planet_1", 200, "assets/imgs/planet_1.png"),
      new Planet(2, "planet_2", 300, "assets/imgs/planet_2.png"),
      new Planet(3, "planet_3", 250, "assets/imgs/planet_3.png"),
    ];

  }

  public getPlanetStyle(planet: Planet) {
    return {
      'background-image' : 'url(' + planet.background + ')',
      'background-size' : planet.size + 'px',
      'height' : planet.size + 'px',
      'width' : planet.size + 'px'}
  };

  public setActivePlanet(planet: Planet){
    this.activePlanet = planet;
  }

}
