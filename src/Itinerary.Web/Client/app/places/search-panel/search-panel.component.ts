import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Autocomplete, PlacesService } from '../../shared/places.service';

@Component({
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  public searchControl: FormControl;
  public filteredPlaces: Autocomplete[];

  constructor(
    private ngZone: NgZone,
    private placesService: PlacesService
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap(keyword => this.placesService.autocomplete(<string>keyword))
      .subscribe(value => {
        this.filteredPlaces = value;
      });
  }

  displayFn(autocomplete: Autocomplete): string {
    console.dir(autocomplete);
    return autocomplete ? autocomplete.description : "";
  }
}