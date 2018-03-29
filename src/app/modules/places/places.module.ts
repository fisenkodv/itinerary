import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { GooglePlacesService } from './services';

@NgModule({
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [FindPlacesPageComponent],
  providers: [GooglePlacesService]
})
export class PlacesModule {}
