import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Autocomplete, Location } from './../models/index';

@Injectable()
export class GooglePlacesService  {

  constructor(private http: HttpClient) {
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    return null;
    // const baseUrl = `${super.getBaseApiUrl()}/google/places/autocomplete`;
    // const request = {
    //   keyword
    // };
    // return this.http.get<Autocomplete[]>(`${baseUrl}?${super.urlEncode(request)}`);
  }
}
