import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { Store } from '@ngrx/store';

import * as fromPlaces from '../../places/redux/index';
import { IAppState } from '../../redux/app.state';

import { AuthService } from '../auth/auth.service';
import { SignInDialogComponent } from '../signin/signin-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  public showProgressBar: Observable<boolean>;

  constructor(
    private dialog: MdDialog,
    private authService: AuthService,
    private store: Store<IAppState>) {
    this.showProgressBar = this.store.select(fromPlaces.getLoading);
  }

  public signin() {
    const dialogRef = this.dialog.open(SignInDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      // TODO: Add implementation
    });
  }

  public signout() {
    return;
  }

  public get signedIn(): boolean {
    return this.authService.loggedIn();
  }
}
