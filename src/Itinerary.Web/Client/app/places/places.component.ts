import { Component } from '@angular/core';

import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.scss']
})

export class PlacesComponent {
  public searchCriteria: SearchCriteria;

  public searchHandler(event: SearchCriteria) {
    this.searchCriteria = event;
  }
}
