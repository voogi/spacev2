import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'space-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  public translate : string = "";
  public activePage: string = "space";
  public tabOptions: any;

  constructor(
    private router: Router
  ) {

    this.tabOptions = {

    };

  }

  ngOnInit() {

  }

  changePage(id:string){

    this.activePage = id;

    let val = "0";

    switch (id){
      case "space":
        val = "0";
        // self.router.navigate([{ outlets: { 'space' : ['space']} }]);
        break;
      case "player":
        val = "-100%";
        // self.router.navigate([{ outlets: { 'player' : ['player']} }]);
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
