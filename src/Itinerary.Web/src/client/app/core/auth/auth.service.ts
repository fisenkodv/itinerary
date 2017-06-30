import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthConfig, AuthConfigConsts, AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../base.service';
import { AuthResult } from './auth-result.model';

export function AuthHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME)),
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

@Injectable()
export class AuthService extends BaseService {
  private clientId: string = 'itineraryWebClient';
  private grantType: string = 'password';
  private scope: string = 'offline_access openid';

  constructor(
    private http: Http) {
    super();
  }

  public getToken(): string {
    return localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, token);
  }

  public getTokenExpirationDate(token: string): Date {
    const helper = new JwtHelper();
    return helper.getTokenExpirationDate(token);
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const helper = new JwtHelper();
    return helper.isTokenExpired(token);
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
    const requestOptions = new RequestOptions(new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }));

    return this.http.post(
      baseUrl,
      super.urlEncode(request),
      requestOptions)
      .map((response: Response) => {
        this.setToken(response.json());
        return new AuthResult(true, null);
      }).catch((error: any) => {
        const body: any = error.json();
        return Observable.throw(new AuthResult(false, body.error_description));
      });
  }
}
