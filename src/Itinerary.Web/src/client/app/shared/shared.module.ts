import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { JoinPipe } from './join/join.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule.forRoot(),
    TranslateModule.forChild(),
    FlexLayoutModule],
  declarations: [JoinPipe],
  exports: [JoinPipe]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
