import { Routes, RouterModule } from '@angular/router';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: FindPlacesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PlacesRouterModule {}
