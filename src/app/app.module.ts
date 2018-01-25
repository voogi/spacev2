import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tabs/tab/tab.component';
import { TableComponent } from './components/table/table.component';
import {ResourcesComponent} from './components/resources/resources.component';
import {BackendService} from './services/backend.service';
import {ResourceLoaderService} from './services/resource-loader.service';
import {BuildingSlotsComponent} from './components/building-slots/building-slots.component';
import {ButtonComponent} from './components/button/button.component';
import {BuildingBuilderComponent} from './components/building-builder/building-builder';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BuilderService} from './services/builder.service';
import {DraggableDirective} from './directives/draggable.directive';

import { ProgressQueueComponent } from './components/progress-queue/progress-queue.component';
import {ProgressService} from './services/progress.service';
import { CommonBuilderComponent } from './components/common-builder/common-builder.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { SystemDetailsComponent } from './components/system-details/system-details.component';
import { RounderPipe } from './pipes/rounder.pipe';
import {WebSocketService} from './services/websocket.service';
import { TableRowComponent } from './components/table/table-row/table-row.component';
import { BTimePipe } from './pipes/b-time.pipe';
import {HttpClientModule} from "@angular/common/http";
import {AvailablePipe} from "./pipes/available.pipe";
import {ResourceService} from "./services/resource.service";
import { EnoughMatPipe } from './pipes/enough-mat.pipe';
import {ResIconComponent} from './components/res-icon/res-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    DraggableDirective,
    TabsComponent,
    TabComponent,
    ProgressBarComponent,
    CheckboxComponent,
    SkillTreeComponent,
    FooterComponent,
    TableComponent,
    ResourcesComponent,
    BuildingSlotsComponent,
    ButtonComponent,
    BuildingBuilderComponent,
    ProgressQueueComponent,
    CommonBuilderComponent,
    routedComponents,
    PlanetDetailsComponent,
    SystemDetailsComponent,
    RounderPipe,
    TableRowComponent,
    BTimePipe,
    AvailablePipe,
      EnoughMatPipe,
      ResIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [BackendService, ResourceLoaderService, BuilderService, ProgressService, WebSocketService, ResourceService],
  entryComponents : [ProgressBarComponent, TableRowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
