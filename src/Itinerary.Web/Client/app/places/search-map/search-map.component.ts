import { Component, Input, OnInit } from '@angular/core';

import { Place, PlacesService } from '../../shared/places.service';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public places: Place[];

  private distance: number;
  private rating: number;

  @Input() set searchCriteria(value: SearchCriteria) {
    if (value) {
      this.latitude = value.location.lat;
      this.longitude = value.location.lng;
      this.distance = value.distance;
      this.rating = value.rating;

      this.searchPlaces();
    }
  }
  constructor(private placesService: PlacesService) {
    this.zoom = 8;
  }

  ngOnInit() {
  }

  private searchPlaces() {
    this.placesService.search(this.latitude, this.longitude, this.distance, this.rating)
      .subscribe((places: Place[]) => {
        console.log(places);
        this.places = places;
      });
  }
}
