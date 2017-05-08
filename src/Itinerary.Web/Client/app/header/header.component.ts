import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { SigninDialogComponent } from '../signin/signin-dialog.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private dialog: MdDialog,
    private authService: AuthService) {
  }

  public signin() {
    const dialogRef = this.dialog.open(SigninDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public signout() {
    return;
  }

  public get signedin(): boolean {
    return this.authService.loggedIn();
  }
}
