import {
  Component, ComponentFactory, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChange, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import R from 'ramda';
import {TableRowComponent} from './table-row/table-row.component';

export interface TableOptions {
  data: Array<any>;
  headers: Array<string>;
  json: Array<string>;
}

@Component({
  selector: 'space-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public _options: TableOptions;
  private propMap: any = {};

  @Input() set options(value: any){
        if ( value === void 0) {
          return;
        }
        this._options = value;
        this._options.json.forEach( prop => this.propMap[prop] = {});
        this.create();
  }

  @ViewChild('rowContainer', {read: ViewContainerRef})
  private container;

  private factory: ComponentFactory<TableRowComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(TableRowComponent);
  }

  resolveData(data: any) {
    const resolvedArray = [];
    this._options.json.forEach( prop => {
      function findProp(_data, _prop) {
        const splitted = _prop.split('.');
        if (splitted.length === 1) {
          return _data[_prop];
        }else {
          let value = _data;
          splitted.forEach(pro_p => {
            value = value[pro_p];
          });
          return value;
        }
      }
      resolvedArray.push( findProp(data, prop) );
    });
    return resolvedArray;
  }

  headerClick(prop: string) {
    this.container.clear();
    let sortedArray = R.sortBy(R.prop(prop), this._options.data);
    if (this.propMap[prop].asc !== false) {
      sortedArray = R.reverse(sortedArray);
      this.propMap[prop].asc = false;
    } else {
      this.propMap[prop].asc = true;
    }
    sortedArray.forEach( data => {
      this.createRow(this.resolveData(data));
    });
  }

  filterTable(filter: string) {
    this.container.clear();
    this._options.data.forEach( data => {
      if ( JSON.stringify(data).toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
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
