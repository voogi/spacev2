import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolarSystemComponent, StarmapComponent, PlanetViewComponent, LeaderboardComponent} from './views/index';

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
    path: 'planet/:id',
    component: PlanetViewComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
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

export const routedComponents = [SolarSystemComponent, StarmapComponent, PlanetViewComponent, LeaderboardComponent];
