import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'space-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  public currentWidth: number = 0;
  @Input()
  public duration: number;
  public remainingTime: number;
  @Input()
  public elapsedTime: number;
  @Output()
  completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private ended: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public start(): void {
    this.currentWidth = 0;
    this.remainingTime = this.duration;
    if (this.elapsedTime) {
      this.remainingTime = this.duration - this.elapsedTime;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(time => {
      if (this.elapsedTime) {
        time += this.elapsedTime;
      }

      this.ended = false;
      this.currentWidth = Math.round(((time + 1) / this.duration) * 100);
      this.remainingTime -= 1;
      if ((time + 1) === this.duration) {
        this.ended = true;
        this.subscription.unsubscribe();
        this.completed.emit(this.ended);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
