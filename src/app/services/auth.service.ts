import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthConfigConsts, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../base.service';
import { AuthResult } from './auth-result.model';
import { AuthToken } from './auth-token.model';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private http: HttpClient) {
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
    const baseUrl = `${super.getBaseApiUrl()}/account/token`;
    const request: any = {
      username,
      password
    };

    return this.http.post<AuthToken>(
      baseUrl,
      request)
      .map((response: AuthToken) => {
        this.setToken(response.token);
        return new AuthResult(true, null);
      }).catch((error: any) => {
        const body: any = error;
        return Observable.throw(new AuthResult(false, body.error_description));
      });
  }
}
