import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../../../shared/pipes';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../../translation.module';
import { PlaceSearchComponent } from './place-search/place-search.component';

export const COMPONENTS = [PlaceSearchComponent];

@NgModule({
  imports: [CommonModule, PipesModule, ReactiveFormsModule, MaterialModule, TranslationModule.forChild()],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
