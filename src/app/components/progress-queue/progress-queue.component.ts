import {
  Component, ComponentFactory, ComponentFactoryResolver, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'space-progress-queue',
  templateUrl: './progress-queue.component.html',
  styleUrls: ['./progress-queue.component.css']
})
export class ProgressQueueComponent implements OnInit {

  @ViewChild('queueContainer', { read: ViewContainerRef}) container;
  private factory: ComponentFactory<ProgressBarComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(ProgressBarComponent);
  }

  ngOnInit() {

    this.onAddProgress({duration:10});
    this.onAddProgress({duration:12});
    this.onAddProgress({duration:13});
    this.onAddProgress({duration:14});
    this.onAddProgress({duration:15});

  }

  onAddProgress(progress:any){
    let instance = this.container.createComponent(this.factory,0).instance;
    instance.duration = progress.duration;
    instance.start();
    instance.completed.subscribe( data => console.log(data))
  }

  removeProgress(){

  }

}
