import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../../../shared/pipes';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../../translation.module';
import { PlaceSearchComponent } from './place-search/place-search.component';
import { CommonModule } from '@angular/common';
export const COMPONENTS = [PlaceSearchComponent];

@NgModule({
  imports: [CommonModule, PipesModule, ReactiveFormsModule, MaterialModule, TranslationModule.forChild()],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
