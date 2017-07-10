import {Component, HostBinding, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {BackendService} from '../../services/backend.service';
import {Subscription} from 'rxjs/Subscription';
import {RoutedDataService} from '../../services/routed-data.service';
import {ProgressService} from "../../services/progress.service";

@Component({
  selector: 'space-solarsystem',
  templateUrl: './solarsystem.component.html',
  styleUrls: ['./solarsystem.component.css'],
   animations: [fadeInAnimation]
})
export class SolarSystemComponent implements OnInit {

  @HostBinding('@fadeInAnimation') get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  public planets: Array<IPlanet>;
  public activePlanet: IPlanet;
  private systemId: number;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private backendService: BackendService,
      private routedData: RoutedDataService
  ) { }

  ngOnInit() {

    this.route.params.subscribe( (params: Params) =>  {
      this.systemId = params['id'];
      this.backendService.getPlanetBySystemId( params['id'] ).subscribe( data => {
        data.forEach( d => {
          d.img = '/assets/imgs/planet_2.png';
          d.name = "unknown";
          d.size = 120;
        });
        this.planets = data;
        this.activePlanet = data[0];
      });
    });

  }

  onNavigateToPlanet(planet: IPlanet) {
    this.router.navigate(['/planet', this.systemId, planet.id]);
  }

  public setPlanetStyle(planet: IPlanet) {
    return {
      'background-image' : 'url(' + planet.img + ')',
      'background-size' : planet.size + 'px'};
  };

  public setActivePlanet(planet: IPlanet) {
    this.activePlanet = planet;
    this.routedData.routedPlanet = planet;
  }

}
