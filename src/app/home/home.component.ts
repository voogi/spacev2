import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'space-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showDialog:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
