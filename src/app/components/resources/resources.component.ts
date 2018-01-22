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

    constructor(private resourceService: ResourceService) {}

    ngOnInit() {
        this.updateSub = this.resourceService.getResourceStatus().subscribe( data => {
            this.resources = data;
        });
    }

    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }

}
