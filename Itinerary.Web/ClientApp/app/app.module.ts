import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent
  ],
  entryComponents: [
    AppComponent,
    SettingsDialogComponent
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
