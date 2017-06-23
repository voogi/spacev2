import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolarSystemComponent} from './views/solarsystem/solarsystem.component';
import {PlanetViewComponent} from './views/planetview/planetview.component';
import {StarmapComponent} from './views/starmap/starmap.component';

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

export const routedComponents = [SolarSystemComponent, StarmapComponent, PlanetViewComponent];
