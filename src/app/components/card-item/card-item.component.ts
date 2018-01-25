import {Component, Input, OnInit} from '@angular/core';
import {ConstructionType} from "../../shared/construction-type.enum";

@Component({
    selector: 'space-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

    @Input()
    public item: any;

    constructor() {
    }

    ngOnInit() {
    }

    isResearch(item: any): boolean {
        return item.item.constructionType === ConstructionType.RESEARCH;
    }

}
