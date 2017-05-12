import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthHttp } from 'angular2-jwt';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SigninDialogComponent } from './signin/signin-dialog.component';
import { AuthService, AuthHttpServiceFactory } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    TranslateModule.forChild(),
    FlexLayoutModule],
  entryComponents: [
    SigninDialogComponent
  ],
  declarations: [HeaderComponent, FooterComponent, SigninDialogComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: AuthHttp,
          useFactory: AuthHttpServiceFactory,
          deps: [Http, RequestOptions]
        },
        AuthService,
        TokenStorageService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
