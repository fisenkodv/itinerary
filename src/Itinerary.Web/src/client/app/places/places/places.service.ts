import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseService } from '../../core/base.service';
import { Config } from '../../shared/config/env.config';
import { PlaceDetails } from '../models/index';

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
    const baseUrl = `${super.getBaseServiceUrl()}places/search`;
    const request = {
      lat: latitude,
      lng: longitude,
      distance,
      rating,
      reviews
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(request)}`)
      .map((response: Response) => response.json() as PlaceDetails[]);
  }
}
