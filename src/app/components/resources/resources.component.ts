import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IResource} from '../../shared/interface/iresource';
import {ResourceService} from "../../services/resource.service";

@Component({
    selector: 'space-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

    private updateSub: Subscription = new Subscription();
    public resources: Array<IResource> = [];
    public titanium: number;
    public energy: number;
    public crew: number;
    public plastic: number;

    constructor(private resourceService: ResourceService) {}

    ngOnInit() {
        this.updateSub = this.resourceService.getResourceStatus().subscribe( data => {
            this.titanium = data[0];
            this.plastic = data[1];
            this.crew = data[2];
            this.energy = data[3];
        });
    }

    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }

}
