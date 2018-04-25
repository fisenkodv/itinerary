import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { ChangeViewMode, GetPlaceDetails, GetPlaces, GetPlacesSuccess } from '@app/modules/places/state/places.actions';
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

  @Action(GetPlaceDetails)
  getPlaceDetails({ patchState }: StateContext<PlacesStateModel>) {
    patchState({ loading: true, selectedItem: undefined });
  }
}
