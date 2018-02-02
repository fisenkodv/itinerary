import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthErrorInterceptor } from './auth/auth-error.interceptor';
import { JWTInterceptor } from './auth/jwt.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

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
          provide: HTTP_INTERCEPTORS,
          useClass: AuthErrorInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JWTInterceptor,
          multi: true
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
