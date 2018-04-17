import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { AutocompleteState } from '@app/modules/places/state/autocomplete.state';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { GetPlaces, GetPlacesSuccess, ChangeViewMode } from '@app/modules/places/state/places.actions';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs/operators/map';

export enum ViewMode {
  list = 'list',
  map = 'map'
}

export interface PlacesStateModel {
  loading: boolean;
  viewMode: ViewMode;
  items: Place[];
}

@State<PlacesStateModel>({
  name: 'places',
  defaults: {
    loading: false,
    viewMode: ViewMode.map,
    items: []
  },
  children: [FilterState, AutocompleteState]
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

  constructor(private store: Store, private service: ItineraryPlacesService) {
    this.service.places.subscribe(x => {
      this.store.dispatch(new GetPlacesSuccess(x));
    });
  }

  @Action(GetPlaces)
  getPlaces({ patchState }: StateContext<PlacesStateModel>) {
    patchState({ loading: true, items: [] });
    const filter = <FilterStateModel>this.store.selectSnapshot(state => state.places.filter);
    return this.service.setPlacesFilter({ ...filter });
  }

  @Action(GetPlacesSuccess)
  getPlacesSuccess({ patchState }: StateContext<PlacesStateModel>, { payload }: GetPlacesSuccess) {
    return patchState({ loading: false, items: payload });
  }

  @Action(ChangeViewMode)
  toggleViewMode({ patchState }: StateContext<PlacesStateModel>, { payload }: ChangeViewMode) {
    patchState({ viewMode: payload });
  }
}
