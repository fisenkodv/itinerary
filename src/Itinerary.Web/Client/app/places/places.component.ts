import { Component } from '@angular/core';

import { Location, Place, PlacesService } from '../shared/places.service';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})

export class PlacesComponent {
  public searchCriteria: SearchCriteria;

  constructor(private placeseService: PlacesService) {
  }

  public searchHandler(event: SearchCriteria) {
    this.searchCriteria = event;
  }
}
