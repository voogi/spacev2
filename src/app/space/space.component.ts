import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PagerComponent} from "../components/pager/pager.component";

@Component({
  selector: 'space-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {

  @Input() pageId: number;
  @ViewChild('pager') pager: PagerComponent;
  public tabOptions: any;

  constructor(){

  }

  ngOnInit(){

  }

  onMenuChanged(id:number){
    this.pageId = id;
    this.pager.changePage(this.pageId);
  }

}
