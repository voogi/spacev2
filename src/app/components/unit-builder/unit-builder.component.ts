import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ProgressService} from '../../services/progress.service';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';

@Component({
  selector: 'space-unit-builder',
  templateUrl: './unit-builder.component.html',
  styleUrls: ['./unit-builder.component.css']
})
export class UnitBuilderComponent implements OnInit, OnDestroy {

  public ships: Array<any> = [];
  public visible: boolean = false;
  public selectedShip: any;

  constructor(
      private backendService: BackendService,
      private progressService: ProgressService,
      private builderService: BuilderService) { }


  onBuild() {
    // TODO on ship build
  }
  onCancel() {
    this.visible = false;
  }

  onSelectShip(ship: any) {
    console.log('SELECTED_SHIP', ship);
  }

  ngOnInit(): void {

    this.builderService.onSelectedBuilding().subscribe( (building: IBuilding) => {
      this.visible = true;
      this.backendService.getAllShips().subscribe( data => {
        this.ships = data['military'];
      });
    } );

  }


  ngOnDestroy(): void {
  }
}
