import {
  Component, OnInit, Input, QueryList, ViewChildren
} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";
import {BuilderService} from "../../services/builder.service";
import {IBuilding} from "../../shared/interface/ibuilding";
import {NotificationsService} from "angular2-notifications/dist";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {ISlot} from "../../shared/interface/islot";

@Component({
  selector: 'space-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  @Input()
  public planet: IPlanet;
  public slots: Array<ISlot> = [];
  public selectedSlot:ISlot;
  public building: IBuilding;

  @ViewChildren(ProgressBarComponent)
  public progressBars: QueryList<ProgressBarComponent>;

  constructor(private builder: BuilderService, private notifications: NotificationsService) {
  }

  ngOnInit() {

    for( let i= 0; i < this.planet.slots; i++){
      this.slots.push({
        isEmpty : true,
        building : null,
        position : i
      });
    }

    this.builder.onBuild().subscribe(data => {
      this.building = data;
      this.progressBars.last.start();
      this.selectedSlot.isEmpty = false;
    });

  }

  onSelectSlot(slot:ISlot) {
    this.builder.selectedSlot();
    this.selectedSlot = slot;
  }

  onBuildingCompleted() {
    this.notifications.success("Success", "Sucessfully created a building!!");

  }

}
