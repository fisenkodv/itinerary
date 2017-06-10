import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/takeWhile';
import { Observable, Subject } from 'rxjs/Rx';

import { IAppState } from '../../redux/app.state';
import * as fromPlaces from '../redux/index';
import * as placesActions from '../redux/places/places.actions';

import { Filter, PlaceDetails } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnDestroy {
  public zoom: Observable<number>;
  public places: Observable<PlaceDetails[]>;
  public filter: Observable<Filter>;

  private selectedPlaces: PlaceDetails[];
  private destroy: Subject<void> = new Subject<void>();

  constructor(private store: Store<IAppState>) {
    this.places = this.store.select(fromPlaces.getPlaceEntities);
    this.filter = this.store.select(fromPlaces.getFilterFilter);
    this.zoom = this.store.select(fromPlaces.getMapZoom);

    this.store.select(fromPlaces.getSelectedPlaceEntities)
      .takeUntil(this.destroy)
      .subscribe((selectedPlaces) => this.selectedPlaces = selectedPlaces);
  }

  public ngOnDestroy(): void {
    this.destroy.next();
  }

  public getRadius(filter: Filter): number {
    return filter.distance * 1609.34;
  }

  public markerClick(place: PlaceDetails) {
    this.store.dispatch(new placesActions.SelectPlaceAction(place));
  }

  public iconUrl(place: PlaceDetails): string {
    const color = this.selectedIndex(place) >= 0
      ? 'blue'
      : 'red';
    return `/assets/icon/map/generic-${color}-small.png`;
  }

  public opacity(place: PlaceDetails): number {
    const selectedIndex = this.selectedIndex(place);
    return selectedIndex === 0
      ? 1.0
      : selectedIndex > 0
        ? 0.7
        : 0.5;
  }

  private selectedIndex(place: PlaceDetails): number {
    return this.selectedPlaces
      .findIndex((selectedPlace) => selectedPlace.name === place.name);
  }
}
