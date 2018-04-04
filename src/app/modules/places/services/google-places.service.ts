import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {} from '@types/googlemaps';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';

import { Autocomplete, PlaceDetails } from '../models';

@Injectable()
export class GooglePlacesService {
  private readonly PlaceDetailsElementId: string = 'google_place_details';
  private autocompleteObservableFactory: (keyword: string) => Observable<Autocomplete[]>;
  private placeDetailsObservableFactory: (placeId: string) => Observable<PlaceDetails>;

  constructor(private apiLoader: MapsAPILoader) {
    this.apiLoader.load();
    this.autocompleteObservableFactory = Observable.bindCallback(
      this.autocompleteCallback,
      this.autocompleteResultSelector
    );

    this.placeDetailsObservableFactory = Observable.bindCallback(
      this.getPlaceDetailsCallback,
      this.getPlaceDetailsResultSelector
    );
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    return this.autocompleteObservableFactory(keyword);
  }

  public place(placeId: string): Observable<PlaceDetails> {
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
  ): Autocomplete[] {
    return status === google.maps.places.PlacesServiceStatus.OK
      ? results.map(x => <Autocomplete>{ id: x.place_id, description: x.description })
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
  ): PlaceDetails {
    return status === google.maps.places.PlacesServiceStatus.OK
      ? <PlaceDetails>{
          location: { latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng() }
        }
      : undefined;
  }
}
