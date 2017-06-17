import {Component, OnInit, EventEmitter, Output, Input, ElementRef} from '@angular/core';
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
        style({transform: 'translateY(-500px)'}),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({transform: 'translateY(-500px)'}))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {


  @Input() closable = true;
  @Input() visible: boolean;
  @Input() draggable: boolean = false;
  @Input() hasOverlay: boolean = true;
  @Input() title: string;
  @Input() width: number;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public element: ElementRef) {
  }

  ngOnInit() {
  }

  show(){
    this.visible = true;
  }

  getLeft(){
    return (window.innerWidth / 2 ) - (this.width / 2) + 'px';
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
