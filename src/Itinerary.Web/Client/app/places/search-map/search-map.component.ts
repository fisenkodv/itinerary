import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Location, Place, PlacesService } from '../../shared';
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
  private defaultZoomForSelectedPoint = 8;

  public isBasePointSet: boolean;
  public zoom: number;
  public places: Place[];
  @Output()
  public placeSelect: EventEmitter<Place> = new EventEmitter();

  @Input()
  set searchCriteria(value: SearchCriteria) {
    if (value) {
      this.isBasePointSet = true;
      this.zoom = this.defaultZoomForSelectedPoint;
      this.selectedCriteria = value;
      this.places = [];

      this.searchPlaces();
    }
  }

  get searchCriteria(): SearchCriteria {
    return this.selectedCriteria;
  }

  private selectedCriteria: SearchCriteria;
  private maximumReviews: number;

  public get distanceInMeters(): number {
    return this.searchCriteria.distance * 1609.34;
  }

  constructor(private placesService: PlacesService) {
    this.isBasePointSet = false;
    this.searchCriteria = new SearchCriteria(new Location(this.defaultLatitude, this.defaultLongitude), 0, 0);
    this.zoom = this.defaultZoom;
    this.places = [];
    this.maximumReviews = 0;
  }

  public placeOpacity(place: Place): number {
    return 0.5 + 0.5 * (place.reviews / this.maximumReviews);
  }

  public markerClick(place: Place) {
    this.placeSelect.emit(place);
  }

  private searchPlaces() {
    if (this.searchCriteria.distance > 0 && this.searchCriteria.rating > 0) {
      this.placesService.search(
        this.searchCriteria.location.latitude,
        this.searchCriteria.location.longitude,
        this.searchCriteria.distance,
        this.searchCriteria.rating)
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
}
