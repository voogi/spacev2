import {Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {IPlanet} from '../../shared/interface/iplanet';
import {BackendService} from '../../services/backend.service';
import {IConstruction} from '../../shared/interface/iconstruction';
import {ProgressService} from '../../services/progress.service';
import {Subscription} from "rxjs/Subscription";
import {IBuilder} from "../../shared/interface/ibuilder";
import {BuilderService} from "../../services/builder.service";
import {ConstructionType} from "../../shared/construction-type.enum";

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
  public planetId: number;
  public onBuildSubscription: Subscription = new Subscription();
  public progressServiceSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private progressService: ProgressService,
              private backendService: BackendService,
              private builder: BuilderService,
              private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.systemId = params['system'];
      this.planetId = params['id'];
      this.backendService.getPlanetById(this.planetId).subscribe((planet: IPlanet) => {
        this.selectedPlanet = planet;
        this.addConstructions(planet.constructions);
        this.setPlanetStyle();
      });
    });


    this.onBuildSubscription = this.builder.onBuild().subscribe((builder: IBuilder) => {

      if (builder.type === ConstructionType.BUILDING) {
        this.backendService.startBuildingConstruction({
          buildingType: builder.item,
          constructionType: ConstructionType.BUILDING,
          slot: builder.slot.position
        }, this.planetId).subscribe((construction: IConstruction) => {
          this.onRefresh();
          this.progressService.createProgress(construction);
        });
      }
      if(builder.type === ConstructionType.SHIP){
        this.backendService.startUnitConstruction({
          buildList : this.convertMapToObj(builder.item)
        }, builder.id).subscribe((construction: IConstruction) => {
          this.progressService.createProgress(construction);
        });
      }

    });

    // when any queue completed data is a IBuilder obj
    this.progressServiceSubscription = this.progressService.onComplete().subscribe((construction: IConstruction) => {
      if (construction.constructionType === ConstructionType.BUILDING) {
        this.onRefresh();
      }
    });
  }

  convertMapToObj(strMap: any){
    let obj = Object.create(null);
    strMap.forEach( (v,k) => obj[k] = v);
    return obj;
  }

  onRefresh() {
    this.backendService.getPlanetById(this.planetId).subscribe((planet: IPlanet) => {
      this.selectedPlanet = planet;
    });
  }

  addConstructions(constructions: Array<IConstruction>) {
    for (let i = 0; i < constructions.length; i++) {
      const construction: IConstruction = constructions[i];
      this.progressService.createProgress(construction);
    }
  }

  onNavigateToSystem() {
    this.router.navigate(['/system', this.systemId]);
  }

  onShowNotification() {
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
