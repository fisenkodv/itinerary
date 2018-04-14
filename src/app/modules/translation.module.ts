import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, Optional, SkipSelf, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class TranslationModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: TranslateModule
  ) {
    if (parentModule) {
      throw new Error('TranslateModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return TranslateModule.forRoot(this.getConfig());
  }

  public static forChild(): ModuleWithProviders {
    return TranslateModule.forChild(this.getConfig());
  }

  private static getConfig(): TranslateModuleConfig {
    return { loader: { provide: TranslateLoader, useFactory: TranslateLoaderFactory, deps: [HttpClient] } };
  }
}
