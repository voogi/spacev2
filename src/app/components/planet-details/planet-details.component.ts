import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';

@Component({
    selector: 'space-planet-details',
    templateUrl: './planet-details.component.html',
    styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {

    @Input()
    public planet: IPlanet;

    @Input()
    public ssId: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }
}
