import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'space-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public gridOptions: any;


  constructor() {

    this.gridOptions = {
      rows : 3,
      cols : 3
    };

  }

  ngOnInit() {
  }

}
