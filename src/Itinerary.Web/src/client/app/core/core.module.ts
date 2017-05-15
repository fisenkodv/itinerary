import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthHttp } from 'angular2-jwt';

import { MaterialModule } from '../shared/material.module';
import { AuthHttpServiceFactory, AuthService } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SigninDialogComponent } from './signin/signin-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MaterialModule,
  ],
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
  public static forRoot(): ModuleWithProviders {
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
