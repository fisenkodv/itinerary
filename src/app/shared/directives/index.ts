import { NgModule } from '@angular/core';

import { OnEnterPressDirective } from './on-enter-press.directive';

export const DIRECTIVES = [OnEnterPressDirective];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule {}
