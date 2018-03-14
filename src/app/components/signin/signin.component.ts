import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthResult } from '../core/auth/auth-result.model';
import { AuthService } from '../core/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss']
})
export class SignInComponent implements OnInit{
  public username: string;
  public password: string;
  public error: string;

  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private authService: AuthService) {
  }

  public ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public signIn(form: FormGroup) {
    if (form.valid) {
      this.authService.signin(this.username, this.password)
        .subscribe((result: AuthResult) => {
          this.error = '';
          this.router.navigateByUrl(this.returnUrl);
        }, (result: AuthResult) => {
          this.error = this.getTranslatedMessage(result.errorDescription);
        });
    }
  }

  private getTranslatedMessage(messageToTranslate: string) {
    return this.translateService.instant(`signin.errors.${messageToTranslate}`);
  }
}
