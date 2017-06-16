import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseService } from '../../core/base.service';
import { Filter, PlaceDetails } from '../models/index';

@Injectable()
export class PlacesService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  public search(filter: Filter): Observable<PlaceDetails[]> {
    const baseUrl = `${super.getBaseServiceUrl()}places/search`;
    const request = {
      lat: filter.location.latitude,
      lng: filter.location.longitude,
      distance: filter.distance,
      rating: filter.rating,
      reviews: filter.reviews
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(request)}`)
      .map((response: Response) => response.json() as PlaceDetails[]);
  }
}
