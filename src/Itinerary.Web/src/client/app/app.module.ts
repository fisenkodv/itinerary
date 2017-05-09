import { ApplicationRef, NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import 'hammerjs';

// import '../styles/styles.scss';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AuthModule } from './auth';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeModule } from './home/home.module';
import { PlacesModule } from './places/places.module';
import { GooglePlacesService, PlacesService } from './shared';
import { SigninDialogComponent } from './signin/signin-dialog.component';

const appProviders = [
  PlacesService,
  GooglePlacesService,
  {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }
];

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninDialogComponent
  ],
  entryComponents: [
    AppComponent,
    SigninDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    PlacesModule,
    // AuthModule
  ],
  providers: [
    appProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}
