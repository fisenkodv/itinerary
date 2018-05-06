import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PipesModule } from '../../../shared/pipes';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../../translation.module';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlaceItemComponent } from './place-item/place-item.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesMapComponent } from './places-map/places-map.component';
import { PlacesViewSwitcherComponent } from './places-view-switcher/places-view-switcher.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { SearchSpinnerComponent } from './search-spinner/search-spinner.component';

export const COMPONENTS = [
  SearchPanelComponent,
  PlacesListComponent,
  PlaceItemComponent,
  PlaceRatingComponent,
  PlacesMapComponent,
  PlacesViewSwitcherComponent,
  SearchSpinnerComponent,
  PlaceDetailsComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([]),
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
