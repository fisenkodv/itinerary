import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../../shared/config/app.config';
import { Autocomplete } from './autocompete';
import { Location } from './location';

@Injectable()
export class GooglePlacesService {

  constructor(private http: Http) {}

  autocomplete(keyword: string): Observable<Autocomplete[]> {
    return this.http.get(`${AppConfig
        .itineraryApiBaseUrl}/google/places/autocomplete?keyword=${keyword}`)
      .map((response: Response) => response.json() as Autocomplete[]);
  }

  location(placeId: string): Observable<Location> {
    return this.http.get(`${AppConfig
        .itineraryApiBaseUrl}/google/places/location?placeid=${placeId}`)
      .map((response: Response) => response.json() as Location);
  }
}
