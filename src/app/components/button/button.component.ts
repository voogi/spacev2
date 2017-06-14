import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() name:string;

  constructor() { }

  ngOnInit() {
  }

}
