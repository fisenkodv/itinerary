import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Place, PlacesService } from '../../shared';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent {
  // default location is 'Geographic center of the contiguous United States'
  private defaultLatitude = 39.833333;
  private defaultLongitude = -98.583333;
  private defaultZoom = 5;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public places: Place[];
  public isBasePointSet: boolean;
  @Output()
  public placeSelect: EventEmitter<Place> = new EventEmitter();

  private distance: number;
  private rating: number;
  private maximumReviews: number;

  @Input()
  set searchCriteria(value: SearchCriteria) {
    if (value) {
      this.isBasePointSet = true;
      this.latitude = value.location.latitude;
      this.longitude = value.location.longitude;
      this.distance = value.distance;
      this.rating = value.rating;

      this.searchPlaces();
    }
  }

  public get distanceInMeters(): number {
    return this.distance * 1609.34;
  }

  constructor(private placesService: PlacesService) {
    this.isBasePointSet = false;
    this.latitude = this.defaultLatitude;
    this.longitude = this.defaultLongitude;
    this.zoom = this.defaultZoom;
    this.places = [];
    this.distance = 0;
    this.rating = 0;
    this.maximumReviews = 0;
  }

  public placeOpacity(place: Place): number {
    return 0.5 + 0.5 * (place.reviews / this.maximumReviews);
  }

  public markerClick(place: Place) {
    this.placeSelect.emit(place);
  }

  private searchPlaces() {
    this.placesService.search(this.latitude, this.longitude, this.distance, this.rating)
      .subscribe((places: Place[]) => {
        this.places = places;
        this.maximumReviews = this.places
          .map((place) => place.reviews)
          .reduce((a: number, b: number) => {
            return Math.max(a, b);
          });
      });
  }
}
