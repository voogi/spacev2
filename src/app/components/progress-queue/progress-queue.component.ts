import {
  Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {ProgressService} from '../../services/progress.service';
import {Subscription} from "rxjs/Subscription";
import {IConstruction} from "../../shared/interface/iconstruction";

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
    this.processSub = this.progressServie.addedProgress().subscribe( (construction: IConstruction) => {
      this.onAddProgress(construction);
    });
  }

  ngOnDestroy() {
    this.processSub.unsubscribe();
  }

  onAddProgress(progress: IConstruction) {
    const comp = this.container.createComponent(this.factory);
    const instance = comp.instance;
    let sub: Subscription = new Subscription();
    const sec = progress.end - progress.start;
    const rounded = sec / 1000;
    instance.duration = Math.round( rounded );
    const elaspedTime = (Date.now() - progress.start) / 1000;
    instance.elapsedTime = elaspedTime;
    instance.start();
    sub = instance.completed.subscribe( data => {
      this.progressServie.onCompletedProgress(progress);
      this.container.remove(this.container.indexOf(comp));
      sub.unsubscribe();
    });
  }

}
