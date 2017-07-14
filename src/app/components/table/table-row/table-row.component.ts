import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'space-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input()
  public data: any;

  constructor() { }

  ngOnInit() {
  }

}
