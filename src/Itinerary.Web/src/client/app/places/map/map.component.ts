import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/takeWhile';

import { IAppState } from '../../redux/app.state';
import * as FromRoot from '../redux/index';
import * as placesActions from '../redux/places/places.actions';

import { Filter, PlaceDetails } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnDestroy {
  public zoom: number;
  public places: Observable<PlaceDetails[]>;
  public searchLoading: Observable<boolean>;
  public filter: Observable<Filter>;

  private defaultZoom = 5;
  private defaultZoomForSelectedPoint = 8;
  private selectedPlaces: Observable<PlaceDetails[]>;

  constructor(private store: Store<IAppState>) {
    this.places = this.store.select(FromRoot.getPlaceEntities);
    this.selectedPlaces = this.store.select(FromRoot.getSelectedPlaceEntities);
    this.searchLoading = this.store.select(FromRoot.getSearchLoading);
    this.filter = this.store.select(FromRoot.getFilterFilter);

    this.zoom = this.defaultZoom;
  }

  public toMeters(distance: number): number {
    return distance * 1609.34;
  }

  public markerClick(place: PlaceDetails) {
    this.store.dispatch(new placesActions.SelectPlaceAction(place));
  }

  public ngOnDestroy(): void {
  }

  public iconUrl(place: PlaceDetails): string {
    const color = true//this.wasSelected || this.isSelected
      ? 'blue'
      : 'red';
    return `/assets/icon/map/generic-${color}-small.png`;
  }

  public opacity(place: PlaceDetails): number {
    return true//this.isSelected
      ? 1.0
      : true//this.wasSelected
        ? 0.7
        : 0.5;
  }
}
