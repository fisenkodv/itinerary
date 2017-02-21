import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MdSidenav, MdDialog, MdDialogConfig } from '@angular/material';

import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Component({
  selector: 'itinerary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  places = [
    { rows: 2, name: 'Saratov', human: '', age: 0 },
    { rows: 1, name: 'Prague', human: '', age: 0 },
    { rows: 1, name: 'Thailand', human: '', age: 0 },
    { rows: 1, name: 'Moskow', human: '', age: 0 },
    { rows: 1, name: 'StPetersburg', human: '', age: 0 },
    { rows: 2, name: 'Volgograd', human: '', age: 0 },
    { rows: 1, name: 'NY', human: '', age: 0 },
    { rows: 1, name: 'LasVegas', human: '', age: 0 },
    { rows: 1, name: 'Chicago', human: '', age: 0 }
  ];

  @ViewChild('sidenav') sidenav: MdSidenav;
  currentPlace = {};
  isDarkTheme = false;

  constructor(public dialog: MdDialog, public vcr: ViewContainerRef) {

  }

  public getPlaceFileName(name: string): string {
    return `assets/${name}.png`;
  }

  public showPlace(place) {
    this.currentPlace = place;
    this.sidenav.open();
  }

  public openDialog(){
    const config = new MdDialogConfig();
    config.viewContainerRef = this.vcr;
    this.dialog.open(SettingsDialogComponent, config);
  }
}
