import { State, Action, StateContext } from '@ngxs/store';
import { GoogleAutocomplete, Location } from '@app/modules/places/models';
import { SetLocation } from '@app/modules/places/state/filter.actions';

export interface FilterStateModel {
  location: Location;
  distance: number;
  rating: number;
  reviews: number;
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    location: { latitude: 39.833333, longitude: -98.583333 }, // default location is 'Geographic center of the contiguous United States'
    distance: 50,
    rating: 4,
    reviews: 100
  }
})
export class FilterState {
  @Action(SetLocation)
  setLocation({ getState, setState }: StateContext<FilterStateModel>, { payload }: SetLocation) {
    setState({ ...getState(), location: payload });
  }
}
