import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConstructionType} from "../../shared/construction-type.enum";

@Component({
  selector: 'space-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  @Input()
  public item: any;

  @Output()
  public buildBtnClick: EventEmitter<any> = new EventEmitter();

  @Output()
  public buildValueChanged: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  isUnit(item: any): boolean {
    return item.constructionType === ConstructionType.SHIP;
  }

  onValueChange(value: string, item:any){
    this.buildValueChanged.emit({
      value: value,
      item: item
    });
  }

  emitBtnClick(item: any) {
    this.buildBtnClick.emit(item);
  }

}
