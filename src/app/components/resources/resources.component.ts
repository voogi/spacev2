import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {IResource} from '../../shared/interface/iresource';

@Component({
  selector: 'space-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private getResourcesSub: Subscription;
  public resources: Array<IResource> = [];

  constructor( private backendService: BackendService ) {
    this.getResourcesSub = this.backendService.getPlayerResources('194067').subscribe( data => {
      this.resources = data;
    } );
  }

  onRefresh() {
    this.getResourcesSub = this.backendService.getPlayerResources('194067').subscribe( data => {
      this.resources = data;
    } );
  }

  ngOnInit() {
    const timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(() => {
      for (let i = 0; i < this.resources.length; i++) {
        this.resources[i].amount = this.resources[i].amount + this.resources[i].rate;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.getResourcesSub.unsubscribe();
  }

}
