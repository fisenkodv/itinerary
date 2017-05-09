import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

// import { AppConfig } from '../core/app-config';
import { AppConfig } from '../shared/config/app.config';
// import { JoinPipe } from '../shared';
// import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
// import { PlaceListComponent } from './place-list/place-list.component';
// import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
// import { SearchMapComponent } from './search-map/search-map.component';
// import { SearchPanelComponent } from './search-panel/search-panel.component';

// import { PlacesService } from './places';
// import { GooglePlacesService } from './google-places';
// import { PlacesCommunicationService } from './places-communication';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MaterialModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: AppConfig.googlePlacesApiKey,
      libraries: ['places']
    }),
    PlacesRoutingModule
  ],
  exports: [
    PlacesComponent
  ],
  declarations: [
    // JoinPipe,
    PlacesComponent,
    // SearchPanelComponent,
    // SearchMapComponent,
    // PlaceListItemComponent,
    // PlaceListComponent,
    // PlaceRatingComponent
  ],
  providers: [
    // PlacesService
  ]
})
export class PlacesModule {
}
