import { State, Action, StateContext } from '@ngxs/store';
import { Autocomplete } from '@app/modules/places/models';
import { FilterState } from '@app/modules/places/state/filter.state';
//import { OpenSidenav, CloseSidenav } from './layout.actions';

export interface PlacesStateModel {
  //autocomplete: GoogleAutocomplete[];
}

@State<PlacesStateModel>({
  name: 'places',
  defaults: {
    //  autocomplete: []
  },
  children: [FilterState]
})
export class PlacesState {
  // @Action(OpenSidenav)
  // openSidenav({ getState, setState }: StateContext<PlacesStateModel>) {
  //   setState({ ...getState(), showSidenav: true });
  // }
  // @Action(CloseSidenav)
  // closeSidenav({ getState, setState }: StateContext<PlacesStateModel>) {
  //   setState({ ...getState(), showSidenav: false });
  // }
}
