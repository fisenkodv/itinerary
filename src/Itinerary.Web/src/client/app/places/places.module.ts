import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { AppConfig } from '../shared/config/app.config';

import { PlacesRoutingModule } from './places-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PlacesComponent } from './places.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { SearchMapComponent } from './search-map/search-map.component';

import { PlacesService } from './places/places.service';
import { GooglePlacesService } from './places/google-places.service';
import { PlacesCommunicationService } from './places-communication/places-communication.service';

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
    PlacesRoutingModule,
    SharedModule
  ],
  exports: [
    PlacesComponent,
    SearchPanelComponent,
    PlaceListComponent,
    PlaceListItemComponent,
    SearchMapComponent
  ],
  declarations: [
    PlacesComponent,
    SearchPanelComponent,
    PlaceListComponent,
    PlaceListItemComponent,
    PlaceRatingComponent,
    SearchMapComponent
  ],
  providers: [
    PlacesService,
    GooglePlacesService,
    PlacesCommunicationService
  ]
})
export class PlacesModule {
}
