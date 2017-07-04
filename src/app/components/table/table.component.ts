import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'space-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    @Input()
    public options: any;

    constructor() {
    }

    ngOnInit() {
    }

}
