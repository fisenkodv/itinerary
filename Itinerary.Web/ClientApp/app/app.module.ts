import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';




import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
    BrowserModule,
    MaterialModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
