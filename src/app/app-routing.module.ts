import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SolarsystemComponent} from "./views/solarsystem/solarsystem.component";
import {PlanetviewComponent} from "./views/planetview/planetview.component";
import {StarmapComponent} from "./views/starmap/starmap.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo : "starmap"
  },
  {
    path: 'system/:id',
    component: SolarsystemComponent

  },
  {
    path: 'starmap',
    component: StarmapComponent
  },
  {
    path: 'planet/:id',
    component: PlanetviewComponent
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

export const routedComponents = [SolarsystemComponent,StarmapComponent,PlanetviewComponent];
