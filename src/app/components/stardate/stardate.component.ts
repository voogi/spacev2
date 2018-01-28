import {
   Component, OnInit
} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Component({
  selector: 'space-stardate',
  templateUrl: './stardate.component.html'
})
export class StarDateComponent implements OnInit {

  public time: Observable<any>;
  public clock: Date;

  constructor() {

    this.time = TimerObservable.create(0, 1000);
    this.time.subscribe( () => {
      this.clock = new Date();
    });

  }

  ngOnInit() {

  }


}
