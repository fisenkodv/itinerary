import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AuthenticationService } from '../auth';

@Component({
  selector: 'signin-dialog',
  templateUrl: 'signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss']
})

export class SigninDialogComponent {
  public username: string;
  public password: string;

  constructor(
    private dialogRef: MdDialogRef<SigninDialogComponent>,
    private authService: AuthenticationService) { }

  public signin() {
    this.authService.signin(this.username, this.username);
    return this.dialogRef.close('ok');
  }
}
