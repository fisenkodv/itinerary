import 'rxjs/add/observable/bindCallback';
import { } from '@types/googlemaps';

import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GooglePlacesAutocomplete, GooglePlacesPlace } from '../models';

@Injectable()
export class GooglePlacesService {
  private readonly PlaceDetailsElementId: string = 'google_place_details';
  private autocompleteObservableFactory: (keyword: string) => Observable<GooglePlacesAutocomplete[]>;
  private placeDetailsObservableFactory: (placeId: string) => Observable<GooglePlacesPlace>;

  constructor(private apiLoader: MapsAPILoader) {
    this.apiLoader.load();
    this.autocompleteObservableFactory = Observable.bindCallback(
      this.autocompleteCallback,
      this.autocompleteResultSelector
    );

    this.placeDetailsObservableFactory = Observable.bindCallback(
      this.getPlaceDetailsCallback.bind(this),
      this.getPlaceDetailsResultSelector
    );
  }

  public autocomplete(keyword: string): Observable<GooglePlacesAutocomplete[]> {
    return this.autocompleteObservableFactory(keyword);
  }

  public place(placeId: string): Observable<GooglePlacesPlace> {
    return this.placeDetailsObservableFactory(placeId);
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
  ): GooglePlacesAutocomplete[] {
    return status === google.maps.places.PlacesServiceStatus.OK
      ? results.map(x => <GooglePlacesAutocomplete>{ id: x.place_id, description: x.description })
      : [];
  }

  private getPlaceDetailsElement(): HTMLDivElement {
    let element = <HTMLDivElement>document.getElementById(this.PlaceDetailsElementId);
    if (!element) {
      element = document.createElement('div');
      element.id = this.PlaceDetailsElementId;
    }
    return element;
  }

  private getPlaceDetailsCallback(
    placeId: string,
    callback: (result: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => void
  ) {
    if (placeId !== '') {
      const placesService = new google.maps.places.PlacesService(this.getPlaceDetailsElement());
      placesService.getDetails({ placeId: placeId }, callback);
    }
  }

  private getPlaceDetailsResultSelector(
    result: google.maps.places.PlaceResult,
    status: google.maps.places.PlacesServiceStatus
  ): GooglePlacesPlace {
    return status === google.maps.places.PlacesServiceStatus.OK
      ? <GooglePlacesPlace>{
          id: result.place_id,
          name: result.name,
          location: { latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng() }
        }
      : undefined;
  }
}
