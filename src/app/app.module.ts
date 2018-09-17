import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './modules/core/containers/app/app.component';
import { CoreModule } from './modules/core/core.module';
import { States } from './modules/core/state/app.state';
import { TranslationModule } from './modules/translation.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgxsModule.forRoot(States),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    // NgxsStoragePluginModule.forRoot({
    //   key: '@@STATE',
    //   storage: StorageOption.LocalStorage,
    //   deserialize: JSON.parse,
    //   serialize: JSON.stringify
    // }),
    AppRouterModule,
    CoreModule.forRoot(),
    TranslationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
