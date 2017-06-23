import {
  Component, OnInit, Input
} from '@angular/core';
import {IPlanet} from '../../shared/interface/iplanet';
import {BuilderService} from '../../services/builder.service';
import {IBuilding} from '../../shared/interface/ibuilding';
import {ISlot} from '../../shared/interface/islot';
import {BackendService} from '../../services/backend.service';
import {IBuilder} from '../../shared/interface/ibuilder';
import {ProgressService} from '../../services/progress.service';
import {BuilderType} from '../../shared/builder-type.enum';

@Component({
  selector: 'space-building-slots',
  templateUrl: './building-slots.component.html',
  styleUrls: ['./building-slots.component.css']
})
export class BuildingSlotsComponent implements OnInit {

  @Input()
  public planet: IPlanet;
  public slots: Array<ISlot> = [];
  public selectedSlot: ISlot;
  public building: IBuilding;

  constructor(private builder: BuilderService, private backendService: BackendService, private progressService: ProgressService) {
  }

  ngOnInit() {

    for (let i = 0; i < this.planet.slots; i++) {

      const hasBuilding = this.planet.buildings.filter( data => data.position === i )[0];

      let building: IBuilding;
      if (hasBuilding) {
        building = hasBuilding;
      }

      this.slots.push({
        isEmpty : hasBuilding ? false : true,
        building : building || null,
        position : i
      });
    }


    this.builder.onBuild().subscribe( (builder: IBuilder) => {
      if (builder.type === BuilderType.BULDING) {
        this.building = builder.item;
        this.building.position = builder.slot.position;

        this.backendService.startConstruction({
          building : this.building,
          duration : this.building.time
        }, this.planet.id);
        this.selectedSlot.isEmpty = false;
      }
    });

    // when any queue completed data is a IBuilder obj
    this.progressService.onComplete().subscribe( (builder: IBuilder) => {
      if (builder.type === BuilderType.BULDING) {
        this.slots.forEach( (slot: ISlot) => {
          if (slot.position === builder.slot.position) {
            slot.building = builder.item;
          }
        });
      }
    });

  }

  onSelectSlot(slot: ISlot) {
    if (slot.isEmpty) {
      this.builder.selectedSlot(slot);
      this.selectedSlot = slot;
    }else {
      this.builder.selectedBuilding(slot.building);
    }
  }

  onBuildingCompleted() {
    this.backendService.saveBuilding(this.building, this.planet.id);
  }

}
