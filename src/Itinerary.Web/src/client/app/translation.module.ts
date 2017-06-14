import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslationModule {
  public static forRoot(): ModuleWithProviders {
    return TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [Http]
      }
    });
  }

  constructor( @Optional() @SkipSelf() parentModule: TranslateModule) {
    if (parentModule) {
      throw new Error(
        'TranslateModule is already loaded. Import it in the AppModule only');
    }
  }
}
