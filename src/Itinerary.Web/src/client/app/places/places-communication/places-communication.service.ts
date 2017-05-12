import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PlaceDetails } from '../places/models/index';
import { SearchCriteria } from './search-criteria';

@Injectable()
export class PlacesCommunicationService {
  private placesSource = new Subject<PlaceDetails[]>();
  private selectedPlaceSource = new Subject<PlaceDetails>();
  private searchCriteriaSource = new Subject<SearchCriteria>();

  public places: Observable<PlaceDetails[]> = this.placesSource.asObservable();
  public selectedPlace: Observable<PlaceDetails> = this.selectedPlaceSource.asObservable();
  public searchCriteria: Observable<SearchCriteria> = this.searchCriteriaSource.asObservable();

  constructor() { }

  public notify(places: PlaceDetails[]) {
    this.placesSource.next(places);
  }

  public select(place: PlaceDetails) {
    this.selectedPlaceSource.next(place);
  }

  public search(searchCriteria: SearchCriteria) {
    this.searchCriteriaSource.next(searchCriteria);
  }
}
