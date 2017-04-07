import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Autocomplete, GooglePlacesService, Location } from '../../shared';
import { PlacesCommunicationService } from '../places-communication.service';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  private location: Location;

  public searchControl: FormControl;
  public filteredPlaces: Autocomplete[];

  public distance: number;
  public rating: number;
  public reviews: number;

  constructor(
    private googlePlacesService: GooglePlacesService,
    private placesCommunicationService: PlacesCommunicationService) {
    this.searchControl = new FormControl();
    this.distance = 50;
    this.rating = 4.0;
    this.reviews = 50;
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(<string>keyword))
      .subscribe((value: Autocomplete[]) => {
        this.filteredPlaces = value;
      });

    this.setCurrentPosition();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete != null && autocomplete.placeId) {
      this.googlePlacesService
        .location(autocomplete.placeId)
        .subscribe((location: Location) => {
          this.location = location;
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

  public changeReviewsHandler({ value }) {
    this.reviews = value;
    this.raiseSearch();
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = new Location(position.coords.latitude, position.coords.longitude);
        this.raiseSearch();
      });
    }
  }

  private raiseSearch() {
    const searchCriteria = new SearchCriteria(this.location, this.distance, this.rating, this.reviews);
    this.placesCommunicationService.search(searchCriteria);
  }
}
