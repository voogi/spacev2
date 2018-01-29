import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Subscription} from "rxjs/Subscription";
import {IShip} from "../../shared/interface/iship";

@Component({
    selector: 'space-unit-list',
    templateUrl: './unit-list.component.html',
    styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit, OnDestroy {

    @Input()
    public systemId: string;

    private unit$ub: Subscription = new Subscription();

    constructor(private backendService: BackendService) {
    }

    ngOnInit(): void {
        this.unit$ub = this.backendService.getSystemShips(this.systemId).subscribe((ships: Array<IShip>) => {
            console.log(ships);
        });
    }

    ngOnDestroy(): void {
        this.unit$ub.unsubscribe();
    }

}
