import { Injectable } from '@angular/core';

export enum TokenType {
  AccessToken,
  RefreshToken
}

@Injectable()
export class TokenStorageService {

  public getToken(tokenType: TokenType): string {
    return localStorage.getItem(this.getTokenName(tokenType));
  }

  public setToken(tokenType: TokenType, value: string) {
    localStorage.setItem(this.getTokenName(tokenType), value);
  }

  public removeToken(tokenType: TokenType): void {
    localStorage.removeItem(this.getTokenName(tokenType));
  }

  public setExp(exp: number) {
    localStorage.setItem('exp', exp.toString());
  }

  public getExp(): number {
    return parseInt(localStorage.getItem('exp'), 10);
  }

  public removeExp(): void {
    localStorage.removeItem('exp');
  }

  private getTokenName(tokenType: TokenType): string {
    return tokenType === TokenType.AccessToken
      ? 'token'
      : 'refresh_token';
  }
}
