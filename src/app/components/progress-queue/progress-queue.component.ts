import {
    Component, ComponentFactory, ComponentFactoryResolver, Input, OnChanges, OnDestroy, OnInit, SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {ProgressService} from '../../services/progress.service';
import {Subscription} from "rxjs/Subscription";
import {IConstruction} from "../../shared/interface/iconstruction";

@Component({
    selector: 'space-progress-queue',
    templateUrl: './progress-queue.component.html',
    styleUrls: ['./progress-queue.component.css']
})
export class ProgressQueueComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('queueContainer', {read: ViewContainerRef}) container;
    private factory: ComponentFactory<ProgressBarComponent>;

    private processSub: Subscription = new Subscription();

    @Input()
    private constructions: Array<IConstruction> = [];

    constructor(private resolver: ComponentFactoryResolver, private progressService: ProgressService) {
        this.factory = this.resolver.resolveComponentFactory(ProgressBarComponent);
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        this.container.clear();
        this.addConstructions(this.constructions);
    }

    ngOnInit() {
        this.processSub = this.progressService.addedProgress().subscribe((construction: IConstruction) => {
            this.onAddProgress(construction);
        });
    }

    addConstructions(constructions: Array<IConstruction>) {
        for (let i = 0; i < constructions.length; i++) {
            const construction: IConstruction = constructions[i];
            this.onAddProgress(construction);
        }
    }

    ngOnDestroy() {
        this.processSub.unsubscribe();
    }

    onAddProgress(progress: IConstruction) {
        const comp = this.container.createComponent(this.factory);
        const instance = comp.instance;
        let sub: Subscription = new Subscription();
        const sec = progress.end - progress.start;
        const rounded = sec / 1000;
        instance.duration = Math.round(rounded);
        const elapsedTime = (Date.now() - progress.start) / 1000;
        instance.elapsedTime = Math.round(elapsedTime);
        instance.type = progress.constructionType;
        instance.start();
        sub = instance.completed.subscribe(data => {
            this.progressService.onCompletedProgress(progress);
            this.container.remove(this.container.indexOf(comp));
            sub.unsubscribe();
        });
    }

}
