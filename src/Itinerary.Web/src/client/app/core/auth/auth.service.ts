import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthConfig, AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../base.service';
import { AuthResult } from './models/auth-result.model';
import { TokenStorageService, TokenType } from './token-storage.service';

export function AuthHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

@Injectable()
export class AuthService extends BaseService {
  private clientId: string = 'itineraryWebClient';
  private grantType: string = 'password';
  private scope: string = 'offline_access openid';

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private storageService: TokenStorageService) {
    super();
  }

  public loggedIn(): boolean {
    const token = this.storageService.getToken(TokenType.AccessToken);
    const expired = tokenNotExpired('token', token);
    return expired;
  }

  public signin(username: string, password: string): Observable<AuthResult> {
    const baseUrl = `${super.getBaseServiceUrl(false)}connect/token`;
    const request: any = {
      client_id: this.clientId,
      grant_type: this.grantType,
      scope: this.scope,
      username,
      password
    };

    return this.http.post(
      baseUrl,
      super.urlEncode(request),
      this.getRequestOptions())
      .map((response: Response) => {
        this.store(response.json());
        return new AuthResult(true, null);
      }).catch((error: any) => {
        const body: any = error.json();
        return Observable.throw(new AuthResult(false, body.error_description));
      });
  }

  private getRequestOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return new RequestOptions({ headers });
  }

  private store(body: any): void {
    this.storageService.setToken(TokenType.AccessToken, body.access_token);
    this.storageService.setToken(TokenType.RefreshToken, body.refresh_token);
  }
}
