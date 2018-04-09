import { GooglePlacesAutocomplete, GooglePlacesPlace } from '@app/modules/places/models';
import { GooglePlacesService } from '@app/modules/places/services';
import {
  GetAutocomplete,
  GetAutocompleteSuccess,
  SelectPlace,
  SelectPlaceSuccess
} from '@app/modules/places/state/autocomplete.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map } from 'rxjs/operators';

export interface AutocompleteStateModel {
  loading: boolean;
  items: GooglePlacesAutocomplete[];
  selected: GooglePlacesPlace;
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
  public static loading(state: AutocompleteStateModel): boolean {
    return state.loading;
  }
  @Selector()
  public static items(state: AutocompleteStateModel): GooglePlacesAutocomplete[] {
    return state.items;
  }

  @Selector()
  public static selected(state: AutocompleteStateModel): GooglePlacesPlace {
    return state.selected;
  }

  constructor(private service: GooglePlacesService) {}

  @Action(GetAutocomplete)
  getAutocomplete({ patchState, dispatch }: StateContext<AutocompleteStateModel>, { payload }: GetAutocomplete) {
    patchState({ loading: true });
    return this.service.autocomplete(payload).pipe(map(x => dispatch(new GetAutocompleteSuccess(x))));
  }

  @Action(GetAutocompleteSuccess)
  getAutocompleteSuccess(
    { patchState, setState }: StateContext<AutocompleteStateModel>,
    { payload }: GetAutocompleteSuccess
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
