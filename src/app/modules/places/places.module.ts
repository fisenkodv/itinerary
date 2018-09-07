import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../../../environments/environment';
import { DirectivesModule } from '../../shared/directives';
import { PipesModule } from '../../shared/pipes';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { PlaceDetailsPageComponent } from './containers/place-details-page/place-details-page.component';
import { PlacesRouterModule } from './places-router.module';
import { GooglePlacesService, ItineraryPlacesService } from './services';
import { states } from './state/module.state';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    ComponentsModule,
    PlacesRouterModule,
    NgxsModule.forFeature(states),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [FindPlacesPageComponent, PlaceDetailsPageComponent],
  providers: [GooglePlacesService, ItineraryPlacesService]
})
export class PlacesModule {}
