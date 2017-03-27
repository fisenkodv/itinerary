import { Component, Input } from '@angular/core';

import { Place, PlacesService } from '../../shared';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public places: Place[];

  private distance: number;
  private rating: number;
  private maximumReviews: number;

  @Input()
  set searchCriteria(value: SearchCriteria) {
    if (value) {
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
    this.latitude = 0;
    this.longitude = 0;
    this.zoom = 8;
    this.places = [];
    this.distance = 0;
    this.rating = 0;
    this.maximumReviews = 0;
  }

  public placeOpacity(place: Place): number {
    return 0.5 + 0.5 * (place.reviews / this.maximumReviews);
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
