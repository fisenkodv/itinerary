import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Filter, PlaceDetails } from '../models/index';

@Injectable()
export class PlacesService {
  constructor(private http: HttpClient) {
  }

  public search(filter: Filter): Observable<PlaceDetails[]> {
    // const baseUrl = `${super.getBaseApiUrl()}/places/search`;
    // const request = {
    //   lat: filter.location.latitude,
    //   lng: filter.location.longitude,
    //   distance: filter.distance,
    //   rating: filter.rating
    // };
    // return this.http.get<PlaceDetails[]>(`${baseUrl}?${super.urlEncode(request)}`);
    return null;
  }
}
