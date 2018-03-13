import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PlacesModule } from './places/places.module';
import { effects } from './redux/app.effects';
import { reducers, reducerToken, reducerProvider } from './redux/app.reducers';
import { InitialState } from './redux/app.state';
import { SharedModule } from './shared/shared.module';
import { TranslationModule } from './translation.module';
import { TravelsModule } from './travels/travels.module';

let DevSpecificModules: any = [];

if (!environment.production) {
  DevSpecificModules = [StoreDevtoolsModule.instrument({ maxAge: 50 })];
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  entryComponents: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TranslationModule.forRoot(),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducerToken, { initialState: InitialState }),
    StoreRouterConnectingModule,
    CoreModule.forRoot(),
    SharedModule,
    HomeModule,
    PlacesModule,
    TravelsModule,
    AppRoutingModule,
    DevSpecificModules
  ],
  providers: [reducerProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
