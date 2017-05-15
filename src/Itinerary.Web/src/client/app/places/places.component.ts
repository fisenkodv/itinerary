import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlacesCommunicationService, SearchCriteria } from './places-communication/index';
import { Location, PlaceDetails, PlacesService } from './places/index';

@Component({
  moduleId: module.id,
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.css']
})
export class PlacesComponent implements OnDestroy {
  public searchCriteria: SearchCriteria;

  private searchCriteriaSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private placesCommunicationService: PlacesCommunicationService
  ) {
    this.searchCriteria = new SearchCriteria();
    this.searchCriteriaSubscription = placesCommunicationService.searchCriteria
      .subscribe((searchCriteria) => this.searchHandler(searchCriteria));
  }

  public ngOnDestroy(): void {
    this.searchCriteriaSubscription.unsubscribe();
  }

  public searchHandler(event: SearchCriteria) {
    if (event) {
      this.searchCriteria = event;
      this.searchPlaces(this.searchCriteria);
    }
  }

  private searchPlaces(searchCriteria: SearchCriteria) {
    if (searchCriteria.distance > 0 && searchCriteria.rating > 0) {
      this.placesService.search(
        searchCriteria.location.latitude,
        searchCriteria.location.longitude,
        searchCriteria.distance,
        searchCriteria.rating,
        searchCriteria.reviews)
        .subscribe((places: PlaceDetails[]) => {
          this.placesCommunicationService.notify(places);
        });
    }
  }
}
