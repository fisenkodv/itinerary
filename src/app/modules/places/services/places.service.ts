import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../../core/base.service';
import { Filter, PlaceDetails } from '../models/index';

@Injectable()
export class PlacesService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public search(filter: Filter): Observable<PlaceDetails[]> {
    const baseUrl = `${super.getBaseApiUrl()}/places/search`;
    const request = {
      lat: filter.location.latitude,
      lng: filter.location.longitude,
      distance: filter.distance,
      rating: filter.rating
    };
    return this.http.get<PlaceDetails[]>(`${baseUrl}?${super.urlEncode(request)}`);
  }
}
