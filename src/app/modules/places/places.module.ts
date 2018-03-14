import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

//import { SharedModule } from '../shared/shared.module';
import { PlacesRoutingModule } from './places-routing.module';

import { MapComponent } from './components/map/map.component';
import { PlaceListItemComponent } from './components/place-list-item/place-list-item.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceRatingComponent } from './components/place-rating/place-rating.component';
import { PlacesComponent } from './places.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';

import { GooglePlacesService, PlacesService } from './services/index';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M',
      libraries: ['places']
    }),
    //SharedModule,
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
