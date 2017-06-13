import { Component, OnInit } from '@angular/core';
import {Planet} from "../shared/planet";
import {ActivatedRoute, Params, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {fadeInAnimation, slideInOutAnimation} from "../animations/slide-in-out.animation";

@Component({
  selector: 'space-solarsystem',
  templateUrl: './solarsystem.component.html',
  styleUrls: ['./solarsystem.component.css'],
   animations: [fadeInAnimation],
   host: { '[@fadeInAnimation]': '' }
})
export class SolarsystemComponent implements OnInit {

  public planets: Array<Planet>;
  public activePlanet: Planet;


  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.switchMap( (params: Params) => params["id"] ).subscribe(data => console.log(data));

    this.planets = [
      new Planet(1, "planet_1", 200, "assets/imgs/planet_1.png"),
      new Planet(2, "planet_2", 300, "assets/imgs/planet_2.png"),
      new Planet(3, "planet_3", 250, "assets/imgs/planet_3.png"),
    ];

  }

  onNavigateToStarMap(){
    //this.router.navigate(['/starmap']);
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
