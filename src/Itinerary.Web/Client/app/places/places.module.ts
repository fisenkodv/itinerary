﻿import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppSettings } from '../core/appSettings';
import { JoinPipe } from '../shared';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

@NgModule({
  imports: [
    CommonModule,
    PlacesRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: AppSettings.googlePlacesApiKey,
      libraries: ['places']
    })
  ],
  exports: [],
  declarations: [
    JoinPipe,
    PlacesComponent,
    SearchPanelComponent,
    SearchMapComponent,
    PlaceDetailsComponent,
    PlaceRatingComponent
  ],
  providers: []
})
export class PlacesModule {
}
