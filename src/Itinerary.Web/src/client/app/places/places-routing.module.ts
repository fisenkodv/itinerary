import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesComponent } from './places.component';

const routes: Routes = [
  { path: 'places', component: PlacesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {
}
