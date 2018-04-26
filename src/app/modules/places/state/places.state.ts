import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/observable/empty'; 

import { ChangeViewMode, GetPlaceDetails, GetPlaceDetailsSuccess, GetPlaces, GetPlacesSuccess } from './places.actions';
import { Observable } from 'rxjs/Observable';

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
  private places: Observable<Place[]> = Observable.empty();

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

  public onInit() {
    this.places.subscribe(x => {
      this.store.dispatch(new GetPlacesSuccess(x));
    });
    // this.places.subscribe(x => {
    //   this.store.dispatch(new GetPlacesSuccess(x));
    // });
  }

  @Action(GetPlaces)
  getPlaces({ patchState }: StateContext<PlacesStateModel>) {
    patchState({ loading: true, items: [] });
    const filter = <FilterStateModel>this.store.selectSnapshot(state => state.places.filter);
    //const places =
    return this.itineraryService
      .getPlaces({ ...filter })
      .pipe(switchMap(places => this.store.dispatch(new GetPlacesSuccess(places))));

    // this.places = this.places === undefined ? places : this.places;
    // if (this.places === undefined) {
    // }
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
  getPlaceDetails({ patchState, dispatch }: StateContext<PlacesStateModel>, { payload }: GetPlaceDetails) {
    patchState({
      loading: true,
      selectedItem: undefined
    });

    this.itineraryService.getPlaceDetails(payload).pipe(map(result => dispatch(new GetPlaceDetailsSuccess(result))));
  }

  @Action(GetPlaceDetailsSuccess)
  getPlaceDetailsSuccess({ patchState }: StateContext<PlacesStateModel>, { payload }: GetPlaceDetailsSuccess) {
    patchState({
      loading: false,
      selectedItem: payload
    });
  }
}
