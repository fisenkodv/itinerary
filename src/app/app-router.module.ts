import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './modules/core/containers/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  {
    path: 'places',
    loadChildren: './modules/places/places.module#PlacesModule',
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })]
})
export class AppRouterModule {}
