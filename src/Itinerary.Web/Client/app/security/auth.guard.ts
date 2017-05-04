import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.signinSubject.getValue()) {
      return true;
    }

    // Stores the attempted URL for redirecting.
    const url: string = state.url;
    this.authenticationService.redirectUrl = url;

    // Not signed in so redirects to signin page.
    this.router.navigate(['/signin']);

    return false;
  }
}
