import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {PagerComponent} from "./pager/pager.component";

@Component({
  selector: 'space-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showDialog = false;

  @Input() pageId: string;
  @ViewChild('pager') pager: PagerComponent;

  constructor(){

  }

  ngOnInit(){

  }

  onMenuChanged(id:string){
    this.pageId = id;
    this.pager.changePage(this.pageId);
  }

}
