import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';
import { BaseService } from './base.service';
import { PlaceDetails } from './models';

@Injectable()
export class PlacesService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  public search(
    latitude: number,
    longitude: number,
    distance: number,
    rating: number,
    reviews: number): Observable<PlaceDetails[]> {
    const baseUrl = `${super.getBaseServiceUrl()}/places/search`;
    const parameters = {
      lat: latitude,
      lng: longitude,
      distance,
      rating,
      reviews
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(parameters)}`)
      .map((response: Response) => response.json() as PlaceDetails[]);
  }
}
