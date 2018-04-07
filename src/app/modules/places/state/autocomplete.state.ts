import { Autocomplete, PlaceDetails } from '@app/modules/places/models';
import { GooglePlacesService } from '@app/modules/places/services';
import {
  GetPlaces,
  GetPlacesSuccess,
  SelectPlace,
  SelectPlaceSuccess
} from '@app/modules/places/state/autocomplete.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map } from 'rxjs/operators';

export interface AutocompleteStateModel {
  loading: boolean;
  items: Autocomplete[];
  selected: PlaceDetails;
}

@State<AutocompleteStateModel>({
  name: 'autocomplete',
  defaults: {
    loading: false,
    items: [],
    selected: undefined
  }
})
export class AutocompleteState {
  @Selector()
  public static items(state: AutocompleteStateModel): Autocomplete[] {
    return state.items;
  }

  @Selector()
  public static selected(state: AutocompleteStateModel): PlaceDetails {
    return state.selected;
  }

  @Selector()
  public static loading(state: AutocompleteStateModel): boolean {
    return state.loading;
  }

  constructor(private service: GooglePlacesService) {}

  @Action(GetPlaces)
  getAutocomplete({ patchState, dispatch }: StateContext<AutocompleteStateModel>, { payload }: GetPlaces) {
    patchState({ loading: true });
    return this.service.autocomplete(payload).pipe(map(x => dispatch(new GetPlacesSuccess(x))));
  }

  @Action(GetPlacesSuccess)
  getAutocompleteSuccess(
    { patchState, setState }: StateContext<AutocompleteStateModel>,
    { payload }: GetPlacesSuccess
  ) {
    return patchState({ loading: false, items: payload });
  }

  @Action(SelectPlace)
  selectPlace({ patchState, dispatch }: StateContext<AutocompleteStateModel>, { payload }: SelectPlace) {
    patchState({ loading: true });
    return this.service.place(payload).pipe(map(x => dispatch(new SelectPlaceSuccess(x))));
  }

  @Action(SelectPlaceSuccess)
  selectPlaceSuccess({ patchState, setState }: StateContext<AutocompleteStateModel>, { payload }: SelectPlaceSuccess) {
    return patchState({ loading: false, selected: payload });
  }
}
