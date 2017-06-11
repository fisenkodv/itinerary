import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';

import { IAppState } from '../redux/app.state';
import * as fromPlaces from './redux/index';
import * as placesActions from './redux/places/places.actions';

import { Filter, PlaceDetails } from './models/index';

@Component({
  moduleId: module.id,
  selector: 'places',
  templateUrl: 'places.component.html',
  styleUrls: ['places.component.css']
})
export class PlacesComponent {
  public places: Observable<PlaceDetails[]>;
  public selectedPlaces: Observable<PlaceDetails[]>;
  public reviews: Observable<number>;
  public rating: Observable<number>;
  public distance: Observable<number>;
  public filter: Observable<Filter>;
  public zoom: Observable<number>;

  constructor(private store: Store<IAppState>) {
    this.places = this.store.select(fromPlaces.getPlaceEntities);
    this.selectedPlaces = this.store.select(fromPlaces.getSelectedPlaceEntities);
    this.filter = this.store.select(fromPlaces.getFilterFilter);
    this.zoom = this.store.select(fromPlaces.getMapZoom);
  }
}
