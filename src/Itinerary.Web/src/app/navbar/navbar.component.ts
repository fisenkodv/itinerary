import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

//import * as fromPlaces from '../places/redux/index';
import { IAppState } from '../redux/app.state';

import { AuthService } from '../core/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
  public showProgressBar: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
  ) {
    //this.showProgressBar = this.store.select(fromPlaces.getLoading);
  }

  public signout() {
    return;
  }

  public get isSignedIn(): boolean {
    return !this.authService.isTokenExpired();
  }
}