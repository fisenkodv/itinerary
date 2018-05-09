import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { PlaceDetailsPageComponent } from './containers/place-details-page/place-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: FindPlacesPageComponent
  },
  { path: ':placeId', component: PlaceDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PlacesRouterModule {}
