import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SpaceComponent} from "./space/space.component";
import {PlayerComponent} from "./player/player.component";
import {BackgroundComponent} from "./components/background/background.component";
import {SolarsystemComponent} from "./solarsystem/solarsystem.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo : "system/1"
  },
  {
    path: 'system/:id',
    component: SolarsystemComponent

  },
  {
    path: 'starmap',
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
