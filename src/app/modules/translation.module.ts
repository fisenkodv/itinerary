import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, Optional, SkipSelf, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [TranslateModule]
})
export class TranslationModule {
  public static forRoot(): ModuleWithProviders {
    return TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    });
  }

  public static forChild(): ModuleWithProviders {
    return TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    });
  }

  // constructor(
  //   @Optional()
  //   @SkipSelf()
  //   parentModule: TranslateModule
  // ) {
  //   if (parentModule) {
  //     throw new Error('TranslateModule is already loaded. Import it in the AppModule only');
  //   }
  // }
}
