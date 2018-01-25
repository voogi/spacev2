import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'space-res-icon',
    templateUrl: './res-icon.component.html',
    styleUrls: ['./res-icon.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResIconComponent implements OnInit {

    @Input()
    public text: string;

    @Input()
    public value: string;

    @Input()
    public addClass: boolean = false;

    @Input()
    public tit: string;

    constructor() {
    }

    ngOnInit() {
    }

}
