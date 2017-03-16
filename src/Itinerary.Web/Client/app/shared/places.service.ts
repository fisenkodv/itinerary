import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../core/appSettings';

export class Location {
  constructor(public latitude: number, public longitude: number) {
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

@Injectable()
export class PlacesService {

  constructor(private http: Http) { }

  search(latitude: number, longitude: number, radius: number, rating: number): Observable<Place[]> {
    return this.http.get(`${AppSettings.itineraryApiBaseUrl}/places/search?lat=${latitude}&lng=${longitude}&radius=${radius}&rating=${rating}`)
      .map(response => <Place[]>response.json());
  }
}
