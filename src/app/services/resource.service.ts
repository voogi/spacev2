import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {Subscription} from "rxjs/Subscription";
import {IResource} from "../shared/interface/iresource";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {NgProgressService} from "ng2-progressbar";

@Injectable()
export class ResourceService {

    private getResourcesSub: Subscription;
    public resources: Array<IResource> = [];
    private subscription: Subscription;
    private resourceSubject: Subject<any> = new Subject();

    //TODO lecserelni a beegetett systemId-t
    constructor(private backendService: BackendService, private pService: NgProgressService) {
        this.getResourcesSub = this.backendService.getPlayerResources('194067').subscribe(data => {
            this.resources = data;
        });

        const timer = TimerObservable.create(0, 1000);

        this.subscription = timer.subscribe(() => {
            for (let i = 0; i < this.resources.length; i++) {
                this.resources[i].amount = this.resources[i].amount + this.resources[i].rate;
            }
            this.resourceSubject.next(this.resources);
        });

    }

    getResourceStatus(): Observable<any> {
        return this.resourceSubject;
    }

}
