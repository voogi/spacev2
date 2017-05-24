import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() name:string;
  public visible:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
