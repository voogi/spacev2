import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolarSystemComponent, StarmapComponent, StarmapComponentV2, PlanetViewComponent, LeaderboardComponent} from './views/index';
import {MarketComponent} from "./views/market/market.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo : 'starmapv2'
  },
  {
    path: 'system/:id',
    component: SolarSystemComponent

  },
  {
    path: 'starmap',
    component: StarmapComponent
  },
  {
    path: 'starmapv2',
    component: StarmapComponentV2
  },
  {
    path: 'planet/:system/:id',
    component: PlanetViewComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'market',
    component: MarketComponent
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

export const routedComponents = [SolarSystemComponent, StarmapComponent, StarmapComponentV2, PlanetViewComponent, LeaderboardComponent, MarketComponent];
