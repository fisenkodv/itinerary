import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import 'hammerjs';

import '../styles/styles.scss';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { envProviders } from './environment';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { PlacesModule } from './places/places.module';
import { PlacesService } from './shared/places.service';

const appProviders = [
  PlacesService
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    PlacesModule
  ],
  providers: [
    envProviders,
    appProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}