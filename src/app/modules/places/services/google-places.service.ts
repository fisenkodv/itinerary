import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GooglePlacesService {
  constructor(private httpClient: HttpClient) {}

  public autocomplete(query: string): Observable<any> {
    const queryParameters = {
      input: query,
      key: environment.google.places.apiKey,
      language: 'en',
      components: 'country:us'
    };
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${this.getQuery(queryParameters)}`;
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
