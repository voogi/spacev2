import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ProgressService} from '../../services/progress.service';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';
import {IShip} from '../../shared/interface/iship';
import { ConstructionType} from '../../shared/construction-type.enum';
import {IBuilder} from '../../shared/interface/ibuilder';
import {Subscription} from 'rxjs/Subscription';
import {IConstruction} from '../../shared/interface/iconstruction';

@Component({
  selector: 'space-unit-builder',
  templateUrl: './unit-builder.component.html',
  styleUrls: ['./unit-builder.component.css']
})
export class UnitBuilderComponent implements OnInit, OnDestroy {

  public ships: Array<IShip> = [];
  public visible: boolean = false;
  public selectedShip: IShip;
  public onSelectedBuildingSub: Subscription;
  public onCompleteSub: Subscription;
  public getAllShipSub: Subscription;

  constructor(
      private backendService: BackendService,
      private progressService: ProgressService,
      private builderService: BuilderService)
  {
    this.onSelectedBuildingSub = new Subscription();
    this.onCompleteSub = new Subscription();
    this.getAllShipSub = new Subscription();
  }

  onSelectShip(ship: IShip) {
    this.selectedShip = ship;
  }

  onBuild() {

    if (this.selectedShip === undefined) { return; }

    const item: IBuilder = {
      type  : ConstructionType.UNIT,
      item : this.selectedShip
    };
    this.builderService.build(item);
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

  ngOnInit(): void {

    this.onSelectedBuildingSub = this.builderService.onSelectedBuilding().subscribe( (building: IBuilding) => {
      this.visible = true;
      this.getAllShipSub = this.backendService.getAllShips().subscribe( data => {
        this.ships = data;
      });
    });

    this.onCompleteSub = this.progressService.onComplete().subscribe( (construction: IConstruction) => {
      if (construction.constructionType === ConstructionType.UNIT) {
      }
    });

  }


  ngOnDestroy(): void {
    this.onSelectedBuildingSub.unsubscribe();
    this.onCompleteSub.unsubscribe();
    this.getAllShipSub.unsubscribe();
  }
}
