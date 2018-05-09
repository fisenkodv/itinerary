import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { Place } from '../../models';
import { FilterState } from '../../state/filter.state';
import { ChangeViewMode } from '../../state/places.actions';
import { PlacesState, ViewMode } from '../../state/places.state';

@Component({
  selector: 'app-find-places-page',
  templateUrl: './find-places-page.component.html',
  styleUrls: ['./find-places-page.component.scss']
})
export class FindPlacesPageComponent {
  @Select(PlacesState.loading) loading$: Observable<boolean>;
  @Select(PlacesState.viewMode) viewMode$: Observable<ViewMode>;
  @Select(PlacesState.places) places$: Observable<Place[]>;
  @Select(FilterState.location) location$: Observable<Location>;
  @Select(FilterState.distance) distance$: Observable<number>;

  constructor(private store: Store) {}

  public toggleViewMode(viewMode: ViewMode) {
    this.store.dispatch(new ChangeViewMode(viewMode));
  }
}
