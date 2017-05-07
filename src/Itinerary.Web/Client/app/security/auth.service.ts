import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../core/app-config';
import { AuthTokenStorageService } from './auth-token-storage.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private storageService: AuthTokenStorageService) {
  }

  private getRequestOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return new RequestOptions({ headers: headers });
  }

  public loggedIn(): boolean {
    return tokenNotExpired();
  }

  public signin(username: string, password: string): Observable<any> {
    const request: any = {
      client_id: AppConfig.identityInfo.clientId,
      grant_type: AppConfig.identityInfo.grantType,
      scope: AppConfig.identityInfo.scope,
      username: username,
      password: password
    };

    return this.http.post(AppConfig.authTokenEndpoint, request, this.getRequestOptions())
      .map((res: Response) => {
        const body: any = res.json();
        if (typeof body.access_token !== 'undefined') {
          this.store(body);
        }
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  private store(body: any): void {
    this.storageService.setToken('id_token', body.access_token);
    this.storageService.setToken('refresh_token', body.refresh_token);
  }
}
