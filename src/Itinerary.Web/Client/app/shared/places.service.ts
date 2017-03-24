import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../core/appSettings';

export class Location {
  constructor(public lat: number, public lng: number) {
  }
}

export class Place {
  constructor(
    public name: string,
    public rating: number,
    public reviews: number,
    public location: Location) {
  }
}

export class Autocomplete {
  constructor(
    public id: string,
    public description: string) {
  }
}

export class PlaceDetails {
  constructor(public location: Location) {
  }
}

@Injectable()
export class PlacesService {

  constructor(private http: Http) {}

  search(latitude: number, longitude: number, radius: number, rating: number): Observable<Place[]> {
    return this.http.get(`${AppSettings
        .itineraryApiBaseUrl}/places/search?lat=${latitude}&lng=${longitude}&radius=${radius}&rating=${rating}`)
      .map((response: Response) => <Place[]>response.json());
  }

  autocomplete(keyword: string): Observable<Autocomplete[]> {
    return this.http.get(`${AppSettings
        .itineraryApiBaseUrl}/places/autocomplete?keyword=${keyword}`)
      .map((response: Response) => <Autocomplete[]>response.json());
  }

  details(placeId: string): Observable<PlaceDetails> {
    return this.http.get(`${AppSettings
        .itineraryApiBaseUrl}/places/details?placeid=${placeId}`)
      .map((response: Response) => <PlaceDetails>response.json());
  }
}
