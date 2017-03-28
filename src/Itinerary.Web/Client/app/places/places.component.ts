import { Component } from '@angular/core';

import { PlaceDetails } from '../shared';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})

export class PlacesComponent {
  public searchCriteria: SearchCriteria;
  public place: PlaceDetails;

  public searchHandler(event: SearchCriteria) {
    this.searchCriteria = event;
  }

  public placeSelectHandler(event: PlaceDetails) {
    this.place = event;
  }
}
