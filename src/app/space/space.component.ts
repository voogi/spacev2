import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PagerComponent} from "../pager/pager.component";

@Component({
  selector: 'space-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {

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
