import {
  Component, ComponentFactory, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChange, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TableRowComponent} from "./table-row/table-row.component";

export interface TableOptions {
  data: Array<any>;
  headers : Array<string>;
  json : Array<string>;
}

@Component({
  selector: 'space-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private _options: TableOptions;

  @Input() set options(value: any){
        if( value === void 0) return;
        this._options = value;
        this.create();
  }

  @ViewChild('rowContainer', {read: ViewContainerRef})
  private container;

  private factory: ComponentFactory<TableRowComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(TableRowComponent);
  }

  resolveData(data:any){
    let resolvedArray = [];
    this._options.json.forEach( prop => {
      function findProp(_data,_prop){
        let splitted = _prop.split(".");
        if(splitted.length === 1){
          return _data[_prop];
        }else{
          let value = _data;
          splitted.forEach(pro_p => {
            value = value[pro_p];
          });
          return value;
        }
      }
      resolvedArray.push( findProp(data,prop) )
    });
    return resolvedArray;
  }

  filterTable(filter:string){
    this.container.clear();
    this._options.data.forEach( data => {
      if( JSON.stringify(data).toLowerCase().indexOf(filter.toLowerCase()) != -1){
        this.createRow(this.resolveData(data));
      }
    });
  }

  create() {
    this._options.data.forEach( data => {
      this.createRow(this.resolveData(data));
    });
  }

  createRow(data: any) {
      const comp = this.container.createComponent(this.factory);
      comp.instance.data = data;
  }

  ngOnInit() {

  }

}
