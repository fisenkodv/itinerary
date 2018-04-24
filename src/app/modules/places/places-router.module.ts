import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { PlaceDetailsPageComponent } from './containers/place-details-page/place-details-page.component';
import { PlaceDetailsResolver } from './resolvers/place-details-resolver';

const routes: Routes = [
  {
    path: '',
    component: FindPlacesPageComponent,
  },
  { path: ':placeId', component: PlaceDetailsPageComponent, resolve: { place: PlaceDetailsResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PlacesRouterModule {}
