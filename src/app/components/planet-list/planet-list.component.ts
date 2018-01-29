import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";

@Component({
    selector: 'space-planet-list',
    templateUrl: './planet-list.component.html',
    styleUrls: ['./planet-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetListComponent implements OnInit {

    public _planets: Array<IPlanet>;

    get planets(): Array<IPlanet> {
        return this._planets;
    }

    @Input('planets')
    set planets(value: Array<IPlanet>) {
        this.activePlanet = value[0];
        this._planets = value;
    }

    @Output()
    public selectedPlanet: EventEmitter<IPlanet> = new EventEmitter<IPlanet>();

    public activePlanet: IPlanet;

    constructor() {
    }

    ngOnInit() {
    }

    onSelectPlanet(planet: IPlanet) {
        this.activePlanet = planet;
        this.selectedPlanet.emit(planet);
    }

}
