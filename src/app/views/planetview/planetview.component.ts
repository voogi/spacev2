import {Component, ElementRef, HostBinding, OnInit, Renderer, Renderer2} from '@angular/core';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {IPlanet} from '../../shared/interface/iplanet';
import {NotificationsService} from 'angular2-notifications/dist';
import {RoutedDataService} from '../../services/routed-data.service';
import {BackendService} from '../../services/backend.service';
import {IConstruction} from "../../shared/interface/iconstruction";
import {ProgressService} from "../../services/progress.service";

@Component({
  selector: 'space-planetview',
  templateUrl: './planetview.component.html',
  styleUrls: ['./planetview.component.css'],
  animations: [fadeInAnimation]
})
export class PlanetViewComponent implements OnInit {

  @HostBinding('@fadeInAnimation') get fadeInAnimation() {
    return '@fadeInAnimation';
  }

  public selectedPlanet: IPlanet;
  public systemId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationsService,
              private progressService: ProgressService,
              private backendService: BackendService,
              private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.systemId = params['system'];
      this.backendService.getPlanetById(params['id']).subscribe((planet: IPlanet) => {
        this.selectedPlanet = planet;
        this.addConstructions(planet.constructions);
        this.setPlanetStyle();
      });
    });
  }

  addConstructions(constructions: Array<IConstruction>){
    for (let i = 0; i < constructions.length; i++) {
      const construction: IConstruction = constructions[i];
      this.progressService.createProgress(construction);
    }
  }

  onNavigateToSystem() {
    this.router.navigate(['/system', this.systemId]);
  }

  onShowNotification() {
    this.notificationService.success('Success', 'Sucessfully created a notification');
  }

  setPlanetStyle() {
    this.selectedPlanet.size = 200;
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.planet'),
      'background-image', 'url(' + (this.selectedPlanet.img || '/assets/imgs/planet_2.png') + ')');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.planet'),
      'background-size', this.selectedPlanet.size + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.planet'),
      'height', this.selectedPlanet.size + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.planet'),
      'width', this.selectedPlanet.size + 'px');
  }
}
