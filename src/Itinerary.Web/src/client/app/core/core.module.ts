import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';

import { AuthErrorHandler } from './auth/auth-error.handler';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpServiceFactory, AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  entryComponents: [],
  declarations: [NavbarComponent, FooterComponent],
  exports: [
    NavbarComponent,
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
        {
          provide: ErrorHandler,
          useClass: AuthErrorHandler
        },
        AuthGuard,
        AuthService
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
