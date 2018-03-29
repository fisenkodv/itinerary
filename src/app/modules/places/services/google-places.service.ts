import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';
import { GoogleAutocomplete } from '../models';

@Injectable()
export class GooglePlacesService {
  constructor(private httpClient: HttpClient) {}

  public autocomplete(keyword: string): Observable<GoogleAutocomplete[]> {
    const queryParameters = {
      input: keyword,
      key: environment.google.places.apiKey,
      language: 'en',
      components: 'country:us',
      types: '(cities)'
    };
    const query = this.getQuery(queryParameters);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${query}`;

    return this.httpClient.get<GoogleAutocomplete[]>(url);
  }

  private getQuery(parameters: object): string {
    const parametersArray: string[] = [];
    for (const property in parameters) {
      if (parameters.hasOwnProperty(property)) {
        parametersArray.push(`${property}=${parameters[property]}`);
      }
    }

    return parametersArray.join('&');
  }
}
