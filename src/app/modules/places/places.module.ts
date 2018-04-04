import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { GooglePlacesService } from './services';
import { states } from './state/module.state';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.google.places.apiKey,
      libraries: ['maps', 'places']
    }),
    NgxsModule.forFeature(states)
  ],
  declarations: [FindPlacesPageComponent],
  providers: [GooglePlacesService]
})
export class PlacesModule {}
