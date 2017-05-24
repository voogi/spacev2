import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {TabComponent} from "./tab/tab.component";

@Component({
  selector: 'space-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit,AfterContentInit {

  @Input() options:any;
  public activeTab:string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.activeTab = this.tabs.first.name;
  }

  select(name:string){
    this.activeTab = name;
  }

}
