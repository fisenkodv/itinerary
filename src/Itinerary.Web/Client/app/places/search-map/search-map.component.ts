import { Component, Input, OnInit } from '@angular/core';

import { Autocomplete, Location, PlaceDetails, PlacesService } from '../../shared/places.service';
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

  private distance: number;
  private rating: number;

  @Input() set searchCriteria(value: SearchCriteria) {
    if (value) {
      this.latitude = value.location.lat;
      this.longitude = value.location.lng;
      this.distance = value.distance;
      this.rating = value.rating;
    }
  }
  constructor(private placesService: PlacesService) {
    this.zoom = 8;
  }

  ngOnInit() {
  }
}
