import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {fadeInAnimation} from '../../animations/slide-in-out.animation';
import {BackendService} from '../../services/backend.service';
import {BuilderService} from "../../services/builder.service";
import {ProgressService} from "../../services/progress.service";
import {Subscription} from "rxjs/Subscription";
import {IConstruction} from "../../shared/interface/iconstruction";

@Component({
    selector: 'space-solarsystem',
    templateUrl: './solarsystem.component.html',
    styleUrls: ['./solarsystem.component.css'],
    animations: [fadeInAnimation]
})
export class SolarSystemComponent implements OnInit, OnDestroy {

    @HostBinding('@fadeInAnimation') get fadeInAnimation() {
        return '@fadeInAnimation';
    }

    public planets: Array<IPlanet>;
    public activePlanet: IPlanet;
    private systemId: number;

    public onBuildSubscription: Subscription = new Subscription();
    public progressServiceSubscription: Subscription = new Subscription();
    public refreshSubscription: Subscription = new Subscription();
    public planetInfoSubscription: Subscription = new Subscription();


    constructor(private route: ActivatedRoute,
                private router: Router,
                private backendService: BackendService,
                private builder: BuilderService,
                private progressService: ProgressService) {
    }

    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            this.systemId = params['id'];
            this.onRefresh();
        });

        // when any queue completed data is a IBuilder obj
        this.progressServiceSubscription = this.progressService.onComplete().subscribe((construction: IConstruction) => {
            this.onRefresh();
        });

        this.refreshSubscription = this.builder.refresh().subscribe((data: any) => this.onRefresh());

    }

    onRefresh() {
        this.planetInfoSubscription = this.backendService.getPlanetBySystemId(this.systemId).subscribe(data => {
            data.forEach(d => {
                d.img = '/assets/imgs/planet_2.png';
                d.name = 'unknown';
                d.size = 120;
            });
            this.planets = data;
            this.activePlanet = data[0];
            // this.addConstructions(this.activePlanet.constructions);
        });
    }

    ngOnDestroy(): void {
        this.onBuildSubscription.unsubscribe();
        this.progressServiceSubscription.unsubscribe();
        this.refreshSubscription.unsubscribe();
        this.planetInfoSubscription.unsubscribe();
    }

    setPlanetStyle(planet: IPlanet) {
        return {
            'background-image': 'url(' + planet.img + ')',
            'background-size': planet.size + 'px'
        };
    };

    setActivePlanet(planet: IPlanet) {
        this.activePlanet = planet;
    }

}
