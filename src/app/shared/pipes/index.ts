import { NgModule } from '@angular/core';

import { JoinPipe } from './join.pipe';

export const PIPES = [JoinPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule { }
