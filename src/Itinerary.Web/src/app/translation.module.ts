import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslationModule {
  public static forRoot(): ModuleWithProviders {
    return TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    });
  }

  constructor(@Optional() @SkipSelf() parentModule: TranslateModule) {
    if (parentModule) {
      throw new Error(
        'TranslateModule is already loaded. Import it in the AppModule only');
    }
  }
}
