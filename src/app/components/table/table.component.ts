import {
  Component, ComponentFactory, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChange, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TableRowComponent} from "./table-row/table-row.component";

@Component({
  selector: 'space-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private _options: any;

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

  create() {
    this._options.data.forEach( data => {
      this.createRow(data);
    });
  }

  createRow(data: any) {
      const comp = this.container.createComponent(this.factory);
  }

  ngOnInit() {

  }

}
