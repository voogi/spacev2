import { Component, OnInit } from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {BackendService} from '../../services/backend.service';
import {Subscription} from 'rxjs/Subscription';
import {RoutedDataService} from '../../services/routed-data.service';

@Component({
  selector: 'space-solarsystem',
  templateUrl: './solarsystem.component.html',
  styleUrls: ['./solarsystem.component.css'],
   animations: [fadeInAnimation],
   host: { '[@fadeInAnimation]': '' }
})
export class SolarSystemComponent implements OnInit {

  public planets: Array<IPlanet>;
  private planetSub: Subscription;
  public activePlanet: IPlanet;


  constructor( private route: ActivatedRoute, private router: Router, private backendService: BackendService,
  private routedData: RoutedDataService) { }

  ngOnInit() {

    //this.route.params.switchMap( (params: Params) => params['id'] ).subscribe(data => console.log(data));

    this.planetSub = this.backendService.getAllPlanetBySystem().subscribe( data => {
      this.planets = data;
    });



  }

  onNavigateToStarMap() {
    this.router.navigate(['/starmap']);
  }

  onNavigateToPlanet(planet: IPlanet) {
    this.router.navigate(['/planet', planet.id]);
  }

  public loadPlanetJSON() {
    this.backendService.loadPlanetsJSON();
  }

  public getPlanetStyle(planet: IPlanet) {
    return {
      'background-image' : 'url(' + planet.img + ')',
      'background-size' : planet.size + 'px',
      'height' : planet.size + 'px',
      'width' : planet.size + 'px'};
  };

  public setActivePlanet(planet: IPlanet) {
    this.activePlanet = planet;
    this.routedData.routedPlanet = planet;
  }

}
