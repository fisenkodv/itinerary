import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { AuthErrorHandler } from './auth/auth-error.handler';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpServiceFactory, AuthService } from './auth/auth.service';

@NgModule({
  imports: [],
  entryComponents: [],
  declarations: [],
  exports: []
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
