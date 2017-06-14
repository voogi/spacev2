import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule, routedComponents} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';
import { PlanetGridComponent } from './components/planet-grid/planet-grid.component';
import {PagerComponent} from "./components/pager/pager.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {TabComponent} from "./components/tabs/tab/tab.component";
import {PageComponent} from "./components/pager/page/page.component";
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './components/table/table.component';
import { SolarsystemComponent } from './solarsystem/solarsystem.component';
import { BackgroundComponent } from './components/background/background.component';
import {ResourcesComponent} from "./components/resources/resources.component";
import {BackendService} from "./backend.service";
import {ResourceLoaderService} from "./services/resource-loader.service";
import { BuildingComponent } from './components/building/building.component';
import { PlanetviewComponent } from './planetview/planetview.component';
import {DummyService} from "./services/dummy.service";
import {SimpleNotificationsModule} from "angular2-notifications/dist";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    PagerComponent,
    routedComponents,
    HomeComponent,
    TabsComponent,
    TabComponent,
    ProgressBarComponent,
    PageComponent,
    CheckboxComponent,
    SkillTreeComponent,
    PlanetGridComponent,
    SolarsystemComponent,
    FooterComponent,
    TableComponent,
    ResourcesComponent,
    BackgroundComponent,
    BuildingComponent,
    PlanetviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [BackendService,ResourceLoaderService, DummyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
