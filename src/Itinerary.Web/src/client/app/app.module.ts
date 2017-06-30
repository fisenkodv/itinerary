import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Effects } from './redux/app.effects';
import { AppReducer } from './redux/app.reducers';
import { InitialState } from './redux/app.state';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { PlacesModule } from './places/places.module';
import { TranslationModule } from './translation.module';
import { TravelsModule } from './travels/travels.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './signin/signin.component';

let DevSpecificModules: any = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DevSpecificModules = [StoreDevtoolsModule.instrumentOnlyWithExtension()];
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    TranslationModule.forRoot(),
    Effects,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreModule.provideStore(AppReducer, InitialState),
    RouterStoreModule.connectRouter(),
    CoreModule.forRoot(),
    HomeModule,
    PlacesModule,
    TravelsModule,
    AppRoutingModule,
    DevSpecificModules
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
