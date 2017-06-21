import {Component, ElementRef, OnInit, Renderer, Renderer2} from '@angular/core';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {IPlanet} from '../../shared/interface/iplanet';
import {NotificationsService} from 'angular2-notifications/dist';
import {RoutedDataService} from '../../services/routed-data.service';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'space-planetview',
  templateUrl: './planetview.component.html',
  styleUrls: ['./planetview.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class PlanetviewComponent implements OnInit {

  private selectedPlanet: IPlanet;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationsService,
    private routedData: RoutedDataService,
    private backendService: BackendService,
    private renderer: Renderer2,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.route.params.switchMap( (params: Params) => params['id'] ).subscribe(data => {
      this.selectedPlanet = this.backendService.getPlanetById(data[0]);
      this.setPlanetStyle();
    });
  }

  onNavigateToSystem(id: number) {
    this.router.navigate(['/system', id]);
  }

  onShowNotification() {
    this.notificationService.success('Success', 'Sucessfully created a notification');
  }

  setPlanetStyle(){
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector(".planet"),
      'background-image', 'url(' + this.selectedPlanet.img + ')');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector(".planet"),
      'background-size', this.selectedPlanet.size + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector(".planet"),
      'height', this.selectedPlanet.size + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector(".planet"),
      'width', this.selectedPlanet.size + 'px');
  }
}
