import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../../shared/pipes';
import { PlaceSearchComponent } from './place-search/place-search.component';

export const COMPONENTS = [PlaceSearchComponent];

@NgModule({
  imports: [PipesModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
