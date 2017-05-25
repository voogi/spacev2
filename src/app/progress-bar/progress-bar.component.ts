import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs";

@Component({
  selector: 'space-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit,OnDestroy {


  private subscription: Subscription;
  private currentWidth: number = 0;
  @Input() duration:number;
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private ended:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public start(): void {
    this.currentWidth = 0;
    let timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(t => {
      this.ended = false;
      this.currentWidth = Math.round((t / this.duration) * 100);
      if(t == this.duration){
        this.ended = true;
        this.subscription.unsubscribe();
        this.completed.emit(this.ended);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
