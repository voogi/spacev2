import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../animations/slide-in-out.animation";
import {ActivatedRoute, Router} from "@angular/router";
import {DummyService} from "../services/dummy.service";
import {Planet} from "../shared/planet";

@Component({
  selector: 'space-planetview',
  templateUrl: './planetview.component.html',
  styleUrls: ['./planetview.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class PlanetviewComponent implements OnInit {

  private selectedPlanet: Planet;

  constructor(private route: ActivatedRoute, private router: Router, private dummyService: DummyService) { }

  ngOnInit() {
    this.selectedPlanet = this.dummyService.selectedPlanet;
  }

  onNavigateToSystem(id:number){
    this.router.navigate(['/system', id]);
  }

  public getPlanetStyle() {
    return {
      'background-image' : 'url(' + this.selectedPlanet.background + ')',
      'background-size' : this.selectedPlanet.size + 'px',
      'height' : this.selectedPlanet.size + 'px',
      'width' : this.selectedPlanet.size + 'px'}
  };

}
