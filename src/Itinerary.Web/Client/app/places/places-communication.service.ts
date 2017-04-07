import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PlaceDetails, PlacesService } from '../shared';
import { SearchCriteria } from './search-criteria';

@Injectable()
export class PlacesCommunicationService {
  private placesSource = new Subject<PlaceDetails[]>();
  private searchCriteriaSource = new Subject<SearchCriteria>();

  public places: Observable<PlaceDetails[]> = this.placesSource.asObservable();
  public searchCriteria: Observable<SearchCriteria> = this.searchCriteriaSource.asObservable();

  constructor() { }

  public notify(places: PlaceDetails[]) {
    this.placesSource.next(places);
  }

  public search(searchCriteria: SearchCriteria) {
    this.searchCriteriaSource.next(searchCriteria);
  }
}
