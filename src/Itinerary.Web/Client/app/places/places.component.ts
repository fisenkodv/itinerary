import { Component } from '@angular/core';

import { PlaceDetails, PlacesService } from '../shared';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})
export class PlacesComponent {
  // default location is 'Geographic center of the contiguous United States'
  private defaultLatitude = 39.833333;
  private defaultLongitude = -98.583333;

  public latitude: number;
  public longitude: number;
  public distance: number;
  public places: PlaceDetails[];

  public place: PlaceDetails;

  constructor(private placesService: PlacesService) {
    this.latitude = this.defaultLatitude;
    this.longitude = this.defaultLongitude;
    this.distance = 0;
    this.places = [];
  }

  public searchHandler(event: SearchCriteria) {
    if (event) {
      this.latitude = event.location.latitude;
      this.longitude = event.location.longitude;
      this.distance = event.distance * 1609.34;
      this.searchPlaces(event);
    }
  }

  public selectHandler(event: PlaceDetails) {
    this.place = event;
  }

  private searchPlaces(searchCriteria: SearchCriteria) {
    if (searchCriteria.distance > 0 && searchCriteria.rating > 0) {
      this.placesService.search(
          searchCriteria.location.latitude,
          searchCriteria.location.longitude,
          searchCriteria.distance,
          searchCriteria.rating)
        .subscribe((places: PlaceDetails[]) => {
          this.places = places;
        });
    }
  }
}
