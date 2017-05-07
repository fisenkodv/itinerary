import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authenticationService.loggedIn();
  }
}
