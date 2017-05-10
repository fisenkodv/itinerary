import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlacesService } from './places/places.service';
import { Location } from './places/location';
import { PlaceDetails } from './places/placedetails';

import { PlacesCommunicationService } from './places-communication/places-communication.service';
import { SearchCriteria } from './places-communication/search-criteria';

@Component({
  moduleId: module.id,
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.css'],
  //providers: [PlacesCommunicationService]
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

  ngOnDestroy(): void {
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
