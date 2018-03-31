import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {} from '@types/googlemaps';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';

import { GoogleAutocomplete } from '../models';

@Injectable()
export class GooglePlacesService {
  private observableFactory: (keyword: string) => Observable<GoogleAutocomplete[]>;

  constructor(private apiLoader: MapsAPILoader) {
    this.apiLoader.load();
    this.observableFactory = Observable.bindCallback(this.autocompleteCallback, this.autocompleteResultSelector);
  }

  public autocomplete(keyword: string): Observable<GoogleAutocomplete[]> {
    return this.observableFactory(keyword);
  }

  private autocompleteCallback(
    keyword: string,
    callback: (
      result: google.maps.places.AutocompletePrediction[],
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) {
    if (keyword !== '') {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: keyword, componentRestrictions: { country: 'us' }, types: ['(cities)'] },
        callback
      );
    }
  }

  private autocompleteResultSelector(
    results: google.maps.places.AutocompletePrediction[],
    status: google.maps.places.PlacesServiceStatus
  ): GoogleAutocomplete[] {
    return status === google.maps.places.PlacesServiceStatus.OK
      ? results.map(x => <GoogleAutocomplete>{ id: x.place_id, description: x.description })
      : [];
  }
}
