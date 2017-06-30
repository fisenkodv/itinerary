import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AuthResult } from '../core/auth/auth-result.model';
import { AuthService } from '../core/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.css']
})
export class SignInComponent {

  public username: string;
  public password: string;
  public error: string;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService) {
  }

  public signIn(form: FormGroup) {
    if (form.valid) {
      this.authService.signin(this.username, this.password)
        .subscribe((result: AuthResult) => {
          return null;
        }, (result: AuthResult) => {
          this.error = this.getTranslatedMessage(result.errorDescription);
        });
    }
  }

  private getTranslatedMessage(messageToTranslate: string) {
    return this.translateService.instant(`signin.errors.${messageToTranslate}`);
  }
}
