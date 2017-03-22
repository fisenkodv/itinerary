import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

import { Autocomplete, Location, PlaceDetails, PlacesService } from '../../shared/places.service';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  public searchControl: FormControl;
  public filteredPlaces: Autocomplete[];

  public distance: number;
  public rating: number;
  @Output() search: EventEmitter<SearchCriteria> = new EventEmitter();

  private location: Location;

  constructor(private placesService: PlacesService) {
    this.searchControl = new FormControl();
    this.distance = 200;
    this.rating = 3.0;
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.placesService.autocomplete(<string>keyword))
      .subscribe((value) => {
        this.filteredPlaces = value;
      });

    this.setCurrentPosition();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete != null && autocomplete.id) {
      this.placesService
        .details(autocomplete.id)
        .subscribe((details: PlaceDetails) => {
          this.location = details.location;
          this.raiseSearch();
        });
    }
    return autocomplete ? autocomplete.description : '';
  }

  public changeDistanceHandler({ value }) {
    this.distance = value;
    this.raiseSearch();
  }

  public changeRatingHandler({ value }) {
    this.rating = value;
    this.raiseSearch();
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = new Location(position.coords.latitude, position.coords.longitude);
        this.raiseSearch();
        // this.placeseService.search(this.latitude, this.longitude, 20, 5)
        //   .subscribe((next) => {
        //   });
      });
    }
  }

  private raiseSearch() {
    const searchCriteria = new SearchCriteria(this.location, this.distance, this.rating);
    this.search.emit(searchCriteria);
  }
}
