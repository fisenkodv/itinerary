import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlacesRoutingModule } from './places-routing.module';

import { MapComponent } from './map/map.component';
import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesComponent } from './places.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

import { GooglePlacesService, PlacesService } from './places/index';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M',
      libraries: ['places']
    }),
    SharedModule,
    PlacesRoutingModule
  ],
  exports: [],
  declarations: [
    PlacesComponent,
    SearchPanelComponent,
    PlaceListComponent,
    PlaceListItemComponent,
    PlaceRatingComponent,
    MapComponent
  ],
  providers: [
    PlacesService,
    GooglePlacesService
  ]
})
export class PlacesModule {
}
