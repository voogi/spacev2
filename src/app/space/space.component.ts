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
  public tableOption: any;

  constructor(){
    this.tableOption = {
      headers : ["Name","Price","Dev.Time"],
      keys : ['name','price','devTime'],
      data : [
        {
          code : "code",
          name : "name",
          price : 12,
          devTime : 60
        },
        {
          code : "code1",
          name : "name1",
          price : 24,
          devTime : 80
        }
      ]
    };
  }

  ngOnInit(){

  }

  onMenuChanged(id:number){
    this.pageId = id;
    this.pager.changePage(this.pageId);
  }

}
