import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../auth/auth.service';
import { AuthResult } from '../auth/models/auth-result.model';

@Component({
  moduleId: module.id,
  selector: 'signin-dialog',
  templateUrl: 'signin-dialog.component.html',
  styleUrls: ['signin-dialog.component.css']
})

export class SignInDialogComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(
    private translateService: TranslateService,
    private dialogRef: MdDialogRef<SignInDialogComponent>,
    private authService: AuthService) {
  }

  public signIn(form: FormGroup) {
    if (form.valid) {
      this.authService.signin(this.username, this.password)
        .subscribe((result: AuthResult) => {
          this.dialogRef.close();
        }, (result: AuthResult) => {
          this.error = this.getTranslatedMessage(result.errorDescription);
        });
    }
  }

  private getTranslatedMessage(messageToTranslate: string) {
    return this.translateService.instant(`signin.errors.${messageToTranslate}`);
  }
}
