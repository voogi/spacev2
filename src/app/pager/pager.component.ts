import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'space-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  private translate : string = "";

  constructor() {

  }

  ngOnInit() {

  }

  changePage(id:string){

    let val = "0";

    switch (id){
      case "space":
        val = "0";
        break;
      case "player":
        val = "-100%";
        break;
      case "stats":
        val = "-200%";
        break;
      case "option":
        val = "-300%";
        break;
    }

    this.translate = "translateX("+ val +")";
  }

}
