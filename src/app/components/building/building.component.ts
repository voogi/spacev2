import {Component, OnInit, Input, ViewChild, ContentChildren, QueryList, ViewChildren} from '@angular/core';
import {IPlanet} from "../../shared/interface/iplanet";
import {BuilderService} from "../../services/builder.service";
import {IBuilding} from "../../shared/interface/ibuilding";
import {NotificationsService} from "angular2-notifications/dist";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";

@Component({
  selector: 'space-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  @Input()
  public planet: IPlanet;
  public slots: Array<number>;
  public building: IBuilding;
  @ViewChildren(ProgressBarComponent) progressBars: QueryList<ProgressBarComponent>;

  constructor(private builder: BuilderService, private notifications: NotificationsService) {
  }

  ngOnInit() {
    if (this.planet) {
      this.slots = Array.from(Array(this.planet.slots), (x, i) => i);
    }

    this.builder.onBuild().subscribe(data => {
      this.building = data;
      this.progressBars.last.start();
    });

  }

  onSelectSlot() {
    this.builder.selectedSlot()
  }

  onBuildingCompleted() {
    this.notifications.success("Success", "Sucessfully created a building!!");
  }

}
