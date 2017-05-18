import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AuthService } from '../auth/auth.service';
import { SignInDialogComponent } from '../signin/signin-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private dialog: MdDialog,
    private authService: AuthService) {
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
