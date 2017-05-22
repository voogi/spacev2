import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'space-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  private translate : string = "";
  public activePage: string = "space";

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

  }

  changePage(id:string){

    this.activePage = id;


    let val = "0";
    let self = this;

    // switch (id){
    //   case "space":
    //     this.router.navigate(['']);
    //     break;
    //   case "player":
    //     this.router.navigate(['player']);
    //     break;
    //   case "stats":
    //     val = "-200%";
    //     break;
    //   case "option":
    //     val = "-300%";
    //     break;
    // }

    switch (id){
      case "space":
        val = "0";
        self.router.navigate([{ outlets: { 'space' : ['space']} }]);
        break;
      case "player":
        val = "-100%";
        self.router.navigate([{ outlets: { 'player' : ['player']} }]);
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
