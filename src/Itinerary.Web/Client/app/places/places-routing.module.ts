import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

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
