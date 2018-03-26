import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { TranslationModule } from '../translation.module';

@NgModule({
  imports: [CommonModule, MaterialModule, ComponentsModule, RouterModule.forChild(routes), TranslationModule.forChild()],
  declarations: [FindPlacesPageComponent],
  providers: []
})
export class PlacesModule {}
