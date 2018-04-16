import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './modules/core/containers/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  {
    path: 'places',
    loadChildren: './modules/places/places.module#PlacesModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
