import { Component } from '@angular/core';
import { Place } from '@app/modules/places/models';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { ChangeViewMode } from '@app/modules/places/state/places.actions';
import { PlacesState, ViewMode } from '@app/modules/places/state/places.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-find-places-page',
  templateUrl: './find-places-page.component.html',
  styleUrls: ['./find-places-page.component.scss']
})
export class FindPlacesPageComponent {
  @Select(PlacesState.loading) loading$: Observable<boolean>;
  @Select(PlacesState.viewMode) viewMode$: Observable<ViewMode>;
  @Select(PlacesState.places) places$: Observable<Place>;
  @Select(FilterState.location) location$: Observable<Location>;
  @Select(FilterState.distance) distance$: Observable<number>;

  constructor(private store: Store) {}

  public toggleViewMode(viewMode: ViewMode) {
    this.store.dispatch(new ChangeViewMode(viewMode));
  }
}
