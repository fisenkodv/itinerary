import { Place } from '@app/modules/places/models';
import { ItineraryPlacesService } from '@app/modules/places/services';
import { AutocompleteState } from '@app/modules/places/state/autocomplete.state';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { GetPlaces1, GetPlacesSuccess } from '@app/modules/places/state/places.actions';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs/operators/map';
import { Observable } from '@firebase/util';

export interface PlacesStateModel {
  items: Place[];
}

@State<PlacesStateModel>({
  name: 'places',
  defaults: {
    items: []
  },
  children: [FilterState, AutocompleteState]
})
export class PlacesState {
  @Selector()
  public static places(state: PlacesStateModel): Place[] {
    return state.items;
  }

  constructor(private store: Store, private service: ItineraryPlacesService) {}

  @Action(GetPlaces1)
  getPlaces({ patchState, dispatch }: StateContext<PlacesStateModel>) {
    const filter = <FilterStateModel>this.store.selectSnapshot(state => {
      return state.places.filter;
    });

    return this.service
      .getPlaces(filter.distance, filter.rating, filter.reviews, filter.location)
      .pipe(map(x => dispatch(new GetPlacesSuccess(x))));
  }

  @Action(GetPlacesSuccess)
  getAutocompleteSuccess({ patchState, setState }: StateContext<PlacesStateModel>, { payload }: GetPlacesSuccess) {
    return patchState({ items: payload });
  }
}
