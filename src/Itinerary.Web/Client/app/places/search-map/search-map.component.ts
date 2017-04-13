import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlaceDetails } from '../../shared';
import { PlacesCommunicationService } from '../places-communication.service';
import { SearchCriteria } from '../search-criteria';

export class MapPlaceDetail extends PlaceDetails {
  constructor(
    public isSelected: boolean,
    public wasSelected: boolean,
    place: PlaceDetails) {
    super(place.name, place.rating, place.reviews, place.categories, place.url, place.imgUrl, place.location);
  }

  public get iconUrl(): string {
    let color = this.wasSelected || this.isSelected ? 'blue' : 'red';
    return `/assets/icon/map/generic-${color}-small.png`;
  }

  public get opacity(): number {
    return this.isSelected ? 1.0 : this.wasSelected ? 0.7 : 0.5;
  }
}

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent implements OnDestroy {
  private defaultZoom = 5;
  private defaultZoomForSelectedPoint = 8;
  private placesSubscription: Subscription;
  private searchCriteriaSubscription: Subscription;
  private selectedPlaces: string[];

  public zoom: number;
  public showBasePoint: boolean;
  public searchCriteria: SearchCriteria;
  public places: MapPlaceDetail[];

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
    this.selectedPlaces = [];
  }

  public radiusInMeters() {
    return this.searchCriteria.distance * 1609.34;
  }

  public markerClick(place: MapPlaceDetail) {
    this.placesCommunicationService.select(place);
    this.places.forEach((place) => {
      place.wasSelected = place.wasSelected || place.isSelected;
      place.isSelected = false;
    });
    place.isSelected = true;
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  private searchResultsCallBack(places: PlaceDetails[]) {
    this.showBasePoint = places.some(() => true);
    this.zoom = this.showBasePoint ? this.defaultZoomForSelectedPoint : this.zoom;

    this.setPreviousSelectedPlaces(places);
    this.places = places.map(place => new MapPlaceDetail(false, this.wasSelected(place), place));
  }

  private setPreviousSelectedPlaces(places: PlaceDetails[]) {
    let selected = this.places
      .filter(place => place.wasSelected || place.isSelected)
      .map(place => place.name);
    this.selectedPlaces = [...selected, ...this.selectedPlaces];
  }

  private wasSelected(place: PlaceDetails): boolean {
    return this.selectedPlaces.some((x) => x === place.name);
  }
}
