import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ProgressService} from '../../services/progress.service';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';
import {IShip} from '../../shared/interface/iship';
import {BuilderType} from '../../shared/builder-type.enum';
import {IBuilder} from '../../shared/interface/ibuilder';

@Component({
  selector: 'space-unit-builder',
  templateUrl: './unit-builder.component.html',
  styleUrls: ['./unit-builder.component.css']
})
export class UnitBuilderComponent implements OnInit, OnDestroy {

  public ships: Array<IShip> = [];
  public visible: boolean = false;
  public selectedShip: IShip;

  constructor(
      private backendService: BackendService,
      private progressService: ProgressService,
      private builderService: BuilderService) { }


  onBuild() {
    this.builderService.build({
      item : this.selectedShip,
      type : BuilderType.SHIP
    });
  }

  onCancel() {
    this.visible = false;
  }

  onSelectShip(ship: IShip) {
    this.selectedShip = ship;
  }

  ngOnInit(): void {

    this.builderService.onSelectedBuilding().subscribe( (building: IBuilding) => {
      this.visible = true;
      this.backendService.getAllShips().subscribe( data => {
        this.ships = data['military'];
      });
    });

    this.progressService.onComplete().subscribe( (builder: IBuilder) => {
      if (builder.type === BuilderType.SHIP) {
        console.log(builder.item);
      }
    });

  }


  ngOnDestroy(): void {
  }
}
