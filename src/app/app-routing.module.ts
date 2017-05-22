import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SpaceComponent} from "./space/space.component";
import {PlayerComponent} from "./player/player.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'space',
    component: SpaceComponent,
    outlet: "space"
  },
  {
    path: 'player',
    component: PlayerComponent,
    outlet: "player"
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

export const routedComponents = [SpaceComponent, PlayerComponent];
