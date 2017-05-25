import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() public id:string;

  constructor() { }

  ngOnInit() {
  }

}
