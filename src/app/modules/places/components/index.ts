import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { PipesModule } from '../../../shared/pipes';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../../translation.module';
import { PlaceItemComponent } from './place-item/place-item.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesMapComponent } from './places-map/places-map.component';
import { PlacesViewSwitcherComponent } from './places-view-switcher/places-view-switcher.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

export const COMPONENTS = [
  SearchPanelComponent,
  PlacesListComponent,
  PlaceItemComponent,
  PlaceRatingComponent,
  PlacesMapComponent, 
  PlacesViewSwitcherComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslationModule.forChild(),
    AgmCoreModule.forRoot({
      apiKey: environment.google.places.apiKey,
      libraries: ['places']
    })
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
