import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {Router} from "@angular/router";
import {PageComponent} from "./page/page.component";

@Component({
  selector: 'space-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  public translate : string = "";
  public tabOptions: any;
  @ContentChildren(PageComponent) pages: QueryList<PageComponent>;

  constructor(private router: Router) {
    this.tabOptions = {};
  }

  ngOnInit() {

  }

  changePage(id:number){
    this.translate = id == 0 ? "0" : ("-" + window.innerWidth*id + "px");
  }

  onProgressCompleted(){
    console.log("progress ended")
  }

}
