import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '@app/services';
import { Autocomplete, Location } from './../models/index';

@Injectable()
export class GooglePlacesService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    const baseUrl = `${super.getBaseApiUrl()}/google/places/autocomplete`;
    const request = {
      keyword
    };
    return this.http.get<Autocomplete[]>(`${baseUrl}?${super.urlEncode(request)}`);
  }
}
