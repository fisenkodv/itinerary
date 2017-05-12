import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../../shared/config/app.config';
import { Autocomplete, Location } from './models';

@Injectable()
export class GooglePlacesService {

  constructor(private http: Http) { }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    return this.http.get(`${AppConfig
      .itineraryApiBaseUrl}/google/places/autocomplete?keyword=${keyword}`)
      .map((response: Response) => response.json() as Autocomplete[]);
  }

  public location(placeId: string): Observable<Location> {
    return this.http.get(`${AppConfig
      .itineraryApiBaseUrl}/google/places/location?placeid=${placeId}`)
      .map((response: Response) => response.json() as Location);
  }
}
