import { Component } from '@angular/core';

import { Place } from '../shared';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})

export class PlacesComponent {
  public searchCriteria: SearchCriteria;
  public place: Place;

  public searchHandler(event: SearchCriteria) {
    this.searchCriteria = event;
  }

  public placeSelectHandler(event: Place) {
    this.place = event;
  }
}
