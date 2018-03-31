import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { GooglePlacesService } from './services';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.google.places.apiKey,
      libraries: ['maps', 'places']
    })
  ],
  declarations: [FindPlacesPageComponent],
  providers: [GooglePlacesService]
})
export class PlacesModule {}
