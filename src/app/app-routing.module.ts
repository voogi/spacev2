import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolarSystemComponent, StarmapComponent, PlanetViewComponent, LeaderboardComponent} from './views/index';
import {MarketComponent} from "./views/market/market.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo : 'starmap'
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

export const routedComponents = [SolarSystemComponent, StarmapComponent, PlanetViewComponent, LeaderboardComponent, MarketComponent];
