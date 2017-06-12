import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../backend.service";
import {Resource} from "../../shared/resource";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'space-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private getResourcesSub: Subscription;
  public resources: Array<Resource> = [];

  constructor( private backendService:BackendService ) {
    this.getResourcesSub = this.backendService.getPlayerResources("systemId").subscribe( data => {
      this.resources = data.payload;
    } )
  }

  onRefresh(){
    this.getResourcesSub = this.backendService.getPlayerResources("systemId").subscribe( data => {
      this.resources = data.payload;
    } )
  }

  ngOnInit() {
    let timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(() => {
      for(let i = 0; i < this.resources.length; i++){
        this.resources[i].amount += Math.floor( this.resources[i].pps )
      }
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.getResourcesSub.unsubscribe();
  }

}
