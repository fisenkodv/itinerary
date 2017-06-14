import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseService } from '../../core/base.service';
import { Config } from '../../shared/config/env.config';
import { Autocomplete, Location } from './../models/index';

@Injectable()
export class GooglePlacesService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    const baseUrl = `${super.getBaseServiceUrl()}google/places/autocomplete`;
    const request = {
      keyword
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(request)}`)
      .map((response: Response) => response.json() as Autocomplete[]);
  }

  public location(placeId: string): Observable<Location> {
    const baseUrl = `${super.getBaseServiceUrl()}google/places/location`;
    const request = {
      placeid: placeId
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(request)}`)
      .map((response: Response) => response.json() as Location);
  }
}
