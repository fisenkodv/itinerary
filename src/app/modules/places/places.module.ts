import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

 import { ComponentsModule } from './components';
// import { BookEffects } from './effects/book';
// import { CollectionEffects } from './effects/collection';
// import { BookExistsGuard } from './guards/book-exists';

import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
// import { ViewBookPageComponent } from './containers/view-book-page';
// import { SelectedBookPageComponent } from './containers/selected-book-page';
// import { CollectionPageComponent } from './containers/collection-page';
import { MaterialModule } from '../material.module';

import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: FindPlacesPageComponent },
    ]),
    StoreModule.forFeature('places', reducers),
    EffectsModule.forFeature([
      //BookEffects, CollectionEffects
    ]),
  ],
  declarations: [
    FindPlacesPageComponent,
    // ViewBookPageComponent,
    // SelectedBookPageComponent,
    // CollectionPageComponent,
  ],
  providers: [],
})
export class PlacesModule { }
