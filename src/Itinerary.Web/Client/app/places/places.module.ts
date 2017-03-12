import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppSettings } from '../core/appSettings';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
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
  declarations: [PlacesComponent, SearchPanelComponent],
  providers: []
})
export class PlacesModule {
}
