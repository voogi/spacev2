import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISystem} from "../../shared/interface/isystem";
import {Router} from "@angular/router";

@Component({
  selector: 'space-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.css']
})
export class SystemDetailsComponent implements OnInit {

  @Input()
  public visible: boolean = false;

  @Input()
  public system: ISystem;

  public _left: number = 60;
  public _top: number = -30;

  @Input('left')
  set inLeft(val: number) {
    this._left = this._left + val;
  }

  @Input('top')
  set inTop(val: number) {
    this._top = this._top + val;
  }

  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this._left = 60;
    this._top = -30;
    this.closed.emit(this.visible);
  }

  onNavToSystem() {
    this.router.navigate(['/system', this.system.id]);
  }

}
