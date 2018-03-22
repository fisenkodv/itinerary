import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FindPlacesPageComponent],
  providers: [],
})
export class PlacesModule {}
