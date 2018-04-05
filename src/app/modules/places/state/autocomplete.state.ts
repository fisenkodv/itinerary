import { Autocomplete } from '@app/modules/places/models';
import { GooglePlacesService } from '@app/modules/places/services';
import { AutocompleteSuccess, GetAutocomplete } from '@app/modules/places/state/autocomplete.actions';
import { Action, State, StateContext } from '@ngxs/store';
import { map } from 'rxjs/operators';

export interface AutocompleteStateModel {
  autocomplete: Autocomplete[];
}

@State<AutocompleteStateModel>({
  name: 'autocomplete',
  defaults: {
    autocomplete: []
  }
})
export class AutocompleteState {
  constructor(private service: GooglePlacesService) {}

  @Action(GetAutocomplete)
  getAutocomplete(
    { getState, setState, dispatch }: StateContext<AutocompleteStateModel>,
    { payload }: GetAutocomplete
  ) {
    return this.service.autocomplete(payload).pipe(map(x => dispatch(new AutocompleteSuccess(x))));
  }

  @Action(AutocompleteSuccess)
  autocompleteSuccess(
    { patchState, setState }: StateContext<AutocompleteStateModel>,
    { payload }: AutocompleteSuccess
  ) {
    return patchState({ autocomplete: payload });
  }
}
