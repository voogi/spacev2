import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ButtonComponent} from './components/button/button.component';
import {BuildingBuilderComponent} from './components/building-builder/building-builder';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BuilderService} from './services/builder.service';
import {RoutedDataService} from './services/routed-data.service';
import {DraggableDirective} from './directives/draggable.directive';

import { ProgressQueueComponent } from './components/progress-queue/progress-queue.component';
import {ProgressService} from './services/progress.service';
import { UnitBuilderComponent } from './components/unit-builder/unit-builder.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { SystemDetailsComponent } from './components/system-details/system-details.component';
import { RounderPipe } from './pipes/rounder.pipe';
import {WebSocketService} from "./services/websocket.service";
import { TableRowComponent } from './components/table/table-row/table-row.component';

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
    UnitBuilderComponent,
    routedComponents,
    PlanetDetailsComponent,
    SystemDetailsComponent,
    RounderPipe,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [BackendService, ResourceLoaderService, BuilderService, RoutedDataService, ProgressService, WebSocketService],
  entryComponents : [ProgressBarComponent, TableRowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
