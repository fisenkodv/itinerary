import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent, NavbarComponent } from '@app/components';
import { HomeModule, PlacesModule, SharedModule, TranslationModule, TravelsModule } from '@app/modules';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { effects } from './redux/app.effects';
// import { reducers, reducerToken, reducerProvider } from './redux/app.reducers';
// import { InitialState } from './redux/app.state';


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
    // EffectsModule.forRoot(effects),
    // StoreModule.forRoot(reducerToken, { initialState: InitialState }),
    StoreRouterConnectingModule,
    SharedModule,
    HomeModule,
    PlacesModule,
    TravelsModule,
    AppRoutingModule,
    DevSpecificModules
  ],
  //providers: [reducerProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
