import {
  Component, ComponentFactory, ComponentFactoryResolver, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {ProgressService} from "../../services/progress.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'space-progress-queue',
  templateUrl: './progress-queue.component.html',
  styleUrls: ['./progress-queue.component.css']
})
export class ProgressQueueComponent implements OnInit {

  @ViewChild('queueContainer', { read: ViewContainerRef}) container;
  private factory: ComponentFactory<ProgressBarComponent>;

  constructor(private resolver: ComponentFactoryResolver, private progressServie: ProgressService) {
    this.factory = this.resolver.resolveComponentFactory(ProgressBarComponent);
  }

  ngOnInit() {

    this.progressServie.addedProgress().subscribe( data => {
      this.onAddProgress(data);
    })

  }

  onAddProgress(progress:any){
    let comp = this.container.createComponent(this.factory);
    let instance = comp.instance;
    instance.duration = progress.time || progress.building.time;
    instance.start();
    instance.completed.subscribe( data => {
      this.progressServie.onCompletedProgress(data);

      console.log("+INDEX", this.container.indexOf(comp));

      this.container.remove(this.container.indexOf(comp));
    })
  }

}
