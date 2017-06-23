import {
  Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {ProgressService} from '../../services/progress.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'space-progress-queue',
  templateUrl: './progress-queue.component.html',
  styleUrls: ['./progress-queue.component.css']
})
export class ProgressQueueComponent implements OnInit, OnDestroy {

  @ViewChild('queueContainer', { read: ViewContainerRef}) container;
  private factory: ComponentFactory<ProgressBarComponent>;

  private processSub: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private progressServie: ProgressService) {
    this.factory = this.resolver.resolveComponentFactory(ProgressBarComponent);
    this.processSub = new Subscription();
  }

  ngOnInit() {
    this.processSub = this.progressServie.addedProgress().subscribe( data => {
      this.onAddProgress(data);
    });
  }

  ngOnDestroy() {
    this.processSub.unsubscribe();
  }

  onAddProgress(progress: any) {
    const comp = this.container.createComponent(this.factory);
    const instance = comp.instance;
    let sub: Subscription = new Subscription();
    instance.duration = progress.time || progress.item.time;
    instance.start();
    sub = instance.completed.subscribe( data => {
      this.progressServie.onCompletedProgress(progress);
      this.container.remove(this.container.indexOf(comp));
      sub.unsubscribe();
    });
  }

}
