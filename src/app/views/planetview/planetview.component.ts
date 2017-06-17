import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../animations/slide-in-out.animation";
import {ActivatedRoute, Router} from "@angular/router";
import {IPlanet} from "../../shared/interface/iplanet";
import {NotificationsService} from "angular2-notifications/dist";
import {RoutedDataService} from "../../services/routed-data.service";

@Component({
  selector: 'space-planetview',
  templateUrl: './planetview.component.html',
  styleUrls: ['./planetview.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class PlanetviewComponent implements OnInit {

  private selectedPlanet: IPlanet;

  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationsService,
  private routedData: RoutedDataService) { }

  ngOnInit() {
    this.selectedPlanet = this.routedData.routedPlanet;
  }

  onNavigateToSystem(id:number){
    this.router.navigate(['/system', id]);
  }

  onShowNotification() {
    this.notificationService.success("Success", "Sucessfully created a notification");
  }

  public getPlanetStyle() {
    if(this.selectedPlanet){
      return {
        'background-image' : 'url(' + this.selectedPlanet.img + ')',
        'background-size' : this.selectedPlanet.size + 'px',
        'height' : this.selectedPlanet.size + 'px',
        'width' : this.selectedPlanet.size + 'px'}
    }
  };

}
