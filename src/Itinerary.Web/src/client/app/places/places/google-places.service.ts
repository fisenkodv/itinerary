import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';
import { BaseService } from './base.service';
import { Autocomplete, Location } from './models';

@Injectable()
export class GooglePlacesService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    const baseUrl = `${super.getBaseServiceUrl()}/google/places/autocomplete`;
    const parameters = {
      keyword
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(parameters)}`)
      .map((response: Response) => response.json() as Autocomplete[]);
  }

  public location(placeId: string): Observable<Location> {
    const baseUrl = `${super.getBaseServiceUrl()}/google/places/location`;
    const parameters = {
      placeid: placeId
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(parameters)}`)
      .map((response: Response) => response.json() as Location);
  }
}
