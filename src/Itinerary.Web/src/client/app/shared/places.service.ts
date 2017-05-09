import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../core/app-config';
import { PlaceDetails } from './models';

@Injectable()
export class PlacesService {

  constructor(private http: Http) {}

  search(latitude: number,
         longitude: number,
         distance: number,
         rating: number,
         reviews: number): Observable<PlaceDetails[]> {
    return this.http.get(`${AppConfig
        .itineraryApiBaseUrl}/places/search?lat=${latitude}&lng=${longitude}&distance=${distance}&rating=${rating}&reviews=${reviews}`)
      .map((response: Response) => response.json() as PlaceDetails[]);
  }
}
