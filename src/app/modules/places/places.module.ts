import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, JsonpClientBackend, JsonpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { GooglePlacesService } from './services';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';

export function jsonpCallbackContext(){
  console.log(arguments)
}

@NgModule({
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes), HttpClientJsonpModule],
  declarations: [FindPlacesPageComponent],
  providers: [
    GooglePlacesService,
    JsonpClientBackend,
    //{ provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true }
  ]
})
export class PlacesModule {}
