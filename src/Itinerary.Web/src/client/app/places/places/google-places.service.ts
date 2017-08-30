import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseService } from '../../core/base.service';
import { Autocomplete, Location } from './../models/index';

@Injectable()
export class GooglePlacesService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    const baseUrl = `${super.getBaseApiUrl()}/places/autocomplete`;
    const request = {
      keyword
    };
    return this.http.get(`${baseUrl}?${super.urlEncode(request)}`)
      .map((response: Response) => response.json() as Autocomplete[]);
  }
}
