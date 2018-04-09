import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../environments/environment';
import { ComponentsModule } from './components';
import { FindPlacesPageComponent } from './containers/find-places-page/find-places-page.component';
import { routes } from './places.routes';
import { GooglePlacesService, ItineraryPlacesService } from './services';
import { states } from './state/module.state';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.google.places.apiKey,
      libraries: ['maps', 'places']
    }),
    NgxsModule.forFeature(states),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFirestoreModule.enablePersistence()
  ],
  declarations: [FindPlacesPageComponent],
  providers: [GooglePlacesService, ItineraryPlacesService]
})
export class PlacesModule {}
