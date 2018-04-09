import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../../../shared/pipes';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../../translation.module';
import { PlaceItemComponent } from './place-item/place-item.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

export const COMPONENTS = [SearchPanelComponent, PlacesListComponent, PlaceItemComponent];

@NgModule({
  imports: [CommonModule, PipesModule, ReactiveFormsModule, MaterialModule, TranslationModule.forChild()],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
