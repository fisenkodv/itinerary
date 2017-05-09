import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AuthResult, AuthService } from '../auth';

@Component({
  selector: 'signin-dialog',
  templateUrl: 'signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss']
})

export class SigninDialogComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(
    private translateService: TranslateService,
    private dialogRef: MdDialogRef<SigninDialogComponent>,
    private authService: AuthService) {
  }

  public signin() {
    this.authService.signin(this.username, this.password)
      .subscribe((result: AuthResult) => {
        this.dialogRef.close();
      }, (result: AuthResult) => {
        this.error = this.getTranslatedMessage(result.errorDescription);
      });
  }

  private getTranslatedMessage(messageToTranslate: string) {
    return this.translateService.instant(`signin.errors.${messageToTranslate}`);
  }
}
