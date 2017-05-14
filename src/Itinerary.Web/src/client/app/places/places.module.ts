import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { Config } from '../shared/config/env.config';

import { SharedModule } from '../shared/shared.module';
import { PlacesRoutingModule } from './places-routing.module';

import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesComponent } from './places.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

import { PlacesCommunicationService } from './places-communication/places-communication.service';
import { GooglePlacesService } from './places/google-places.service';
import { PlacesService } from './places/places.service';

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
      apiKey: 'AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M',
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
