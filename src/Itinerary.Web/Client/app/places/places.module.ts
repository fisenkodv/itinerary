import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppSettings } from '../core/appSettings';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { JoinPipe } from '../shared';

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
    PlaceDetailsComponent
  ],
  providers: []
})
export class PlacesModule {
}
