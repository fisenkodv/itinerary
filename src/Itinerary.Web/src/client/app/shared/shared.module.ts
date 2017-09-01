import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material.module';

import { OnEnterPressDirective } from './directives/index';
import { JoinPipe } from './pipes/index';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [JoinPipe, OnEnterPressDirective],
  exports: [
    TranslateModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    JoinPipe,
    OnEnterPressDirective
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
