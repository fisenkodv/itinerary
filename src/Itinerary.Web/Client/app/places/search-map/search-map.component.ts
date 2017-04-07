import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlaceDetails } from '../../shared';
import { PlacesCommunicationService } from '../places-communication.service';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent implements OnDestroy {
  private defaultZoom = 5;
  private defaultZoomForSelectedPoint = 8;
  private maximumReviews: number;
  private placesSubscription: Subscription;
  private searchCriteriaSubscription: Subscription;

  public zoom: number;
  public showBasePoint: boolean;
  public searchCriteria: SearchCriteria;
  public places: PlaceDetails[];

  constructor(private placesCommunicationService: PlacesCommunicationService) {
    this.placesSubscription = placesCommunicationService
      .places
      .subscribe((places) => this.searchResultsCallBack(places));
    this.searchCriteriaSubscription = placesCommunicationService
      .searchCriteria
      .subscribe((searchCriteria) => this.searchCriteria = searchCriteria);

    this.zoom = this.defaultZoom;
    this.searchCriteria = new SearchCriteria();
    this.places = [];
    this.maximumReviews = 0;
  }

  public placeOpacity(place: PlaceDetails): number {
    return 0.5 + 0.5 * (place.reviews / this.maximumReviews);
  }

  public radiusInMeters() {
    return this.searchCriteria.distance * 1609.34;
  }

  public markerClick(place: PlaceDetails) {
    this.placesCommunicationService.select(place);
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  private searchResultsCallBack(places: PlaceDetails[]) {
    this.showBasePoint = places.some(() => true);
    this.zoom = this.showBasePoint ? this.defaultZoomForSelectedPoint : this.zoom;
    this.maximumReviews = this.getMaximumReviews(places);
    this.places = places;
  }

  private getMaximumReviews(places: PlaceDetails[]): number {
    return places.some(() => true)
      ? places.map((place) => place.reviews)
        .reduce((a: number, b: number) => {
          return Math.max(a, b);
        })
      : 0;
  }
}
