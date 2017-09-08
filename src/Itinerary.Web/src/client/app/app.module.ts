import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';
let DevSpecificModules: any = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DevSpecificModules = [StoreDevtoolsModule.instrumentOnlyWithExtension()];
}

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  entryComponents: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TranslationModule.forRoot(),
    Effects,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreModule.provideStore(AppReducer, InitialState),
    RouterStoreModule.connectRouter(),
    CoreModule.forRoot(),
    SharedModule,
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
