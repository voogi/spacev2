import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {trigger, transition, style, animate, state} from "@angular/animations";

@Component({
  selector: 'space-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('overlay', [
      state('in', style({ opacity: 0.5})),
      transition('void => *', [
        style({opacity: 0}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ]),
    trigger('dialog', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Input() title: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
