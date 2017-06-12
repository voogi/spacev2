import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SpaceComponent} from "./space/space.component";
import {PlayerComponent} from "./player/player.component";
import {BackgroundComponent} from "./components/background/background.component";

const routes: Routes = [
  {
    path: '',
    component: SpaceComponent
  }
  ,
  {
    path: 'space',
    component: BackgroundComponent
  },
  // {
  //   path: 'player',
  //   component: PlayerComponent,
  //   outlet: "player"
  // }

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
