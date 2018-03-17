import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OnEnterPressDirective } from '@app/directives';
import { JoinPipe } from '@app/pipes';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material.module';
import { TranslationModule } from './translation.module';

@NgModule({
  imports: [
    TranslationModule.forRoot()
  ],
  declarations: [JoinPipe, OnEnterPressDirective],
  exports: [
    CommonModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    JoinPipe,
    OnEnterPressDirective
  ],
  providers: []
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
