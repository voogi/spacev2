import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule, routedComponents} from "./app-routing.module";
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';
import {TabsComponent} from "./components/tabs/tabs.component";
import {TabComponent} from "./components/tabs/tab/tab.component";
import { TableComponent } from './components/table/table.component';
import { SolarsystemComponent } from './views/solarsystem/solarsystem.component';
import {ResourcesComponent} from "./components/resources/resources.component";
import {BackendService} from "./services/backend.service";
import {ResourceLoaderService} from "./services/resource-loader.service";
import { BuildingComponent } from './components/building/building.component';
import { PlanetviewComponent } from './views/planetview/planetview.component';
import {SimpleNotificationsModule} from "angular2-notifications";
import {ButtonComponent} from "./components/button/button.component";
import {BuilderComponent} from "./components/builder/builder.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BuilderService} from "./services/builder.service";
import {StarmapComponent} from "./views/starmap/starmap.component";
import {RoutedDataService} from "./services/routed-data.service";
import { ProgressQueueComponent } from './components/progress-queue/progress-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    routedComponents,
    TabsComponent,
    TabComponent,
    ProgressBarComponent,
    CheckboxComponent,
    SkillTreeComponent,
    SolarsystemComponent,
    FooterComponent,
    TableComponent,
    ResourcesComponent,
    BuildingComponent,
    PlanetviewComponent,
    ButtonComponent,
    BuilderComponent,
    StarmapComponent,
    ProgressQueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [BackendService,ResourceLoaderService,BuilderService,RoutedDataService],
  entryComponents : [ProgressBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
