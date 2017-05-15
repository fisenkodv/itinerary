import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { JoinPipe } from './join/join.pipe';
import { ItineraryMaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    ItineraryMaterialModule
  ],
  declarations: [JoinPipe],
  exports: [
    FlexLayoutModule,
    ItineraryMaterialModule,
    JoinPipe
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
