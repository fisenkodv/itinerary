import 'rxjs/add/observable/empty';

import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ChangeViewMode, GetPlaceDetails, GetPlaces } from './places.actions';

export enum ViewMode {
  list = 'list',
  map = 'map'
}

export interface PlacesStateModel {
  loading: boolean;
  viewMode: ViewMode;
  items: Place[];
  selectedItem: Place;
}

@State<PlacesStateModel>({
  name: 'places',
  defaults: {
    loading: false,
    viewMode: ViewMode.list,
    items: [],
    selectedItem: undefined
  },
  children: [FilterState]
})
export class PlacesState {
  @Selector()
  public static loading(state: PlacesStateModel): boolean {
    return state.loading;
  }

  @Selector()
  public static viewMode(state: PlacesStateModel): ViewMode {
    return state.viewMode;
  }

  @Selector()
  public static places(state: PlacesStateModel): Place[] {
    return state.items;
  }

  @Selector()
  public static selectedPlace(state: PlacesStateModel): Place {
    return state.selectedItem;
  }

  constructor(private store: Store, private itineraryService: ItineraryPlacesService) {}

  @Action(GetPlaces)
  getPlaces({ patchState }: StateContext<PlacesStateModel>) {
    patchState({ loading: true, items: [] });
    const filter = <FilterStateModel>this.store.selectSnapshot(state => state.places.filter);

    return this.itineraryService
      .getPlaces({ ...filter })
      .pipe(tap(places => patchState({ items: places, loading: false })));
  }

  @Action(ChangeViewMode)
  toggleViewMode({ patchState }: StateContext<PlacesStateModel>, { payload }: ChangeViewMode) {
    patchState({ viewMode: payload });
  }

  @Action(GetPlaceDetails)
  getPlaceDetails({ patchState }: StateContext<PlacesStateModel>, { payload }: GetPlaceDetails) {
    patchState({ loading: true, selectedItem: undefined });

    return this.itineraryService
      .getPlaceDetails(payload)
      .pipe(tap(result => patchState({ loading: false, selectedItem: result })));
  }
}
