import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Location } from '../models';
import { AutocompleteState } from './autocomplete.state';
import { SetDistance, SetLocation, SetRating, SetReviews } from './filter.actions';

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
  },
  children: [AutocompleteState]
})
export class FilterState {
  @Selector()
  public static filter(state: FilterStateModel): FilterStateModel {
    return state;
  }

  @Selector()
  public static location(state: FilterStateModel): Location {
    return state.location;
  }

  @Selector()
  public static distance(state: FilterStateModel): number {
    return state.distance;
  }

  @Action(SetLocation)
  setLocation({ getState, setState }: StateContext<FilterStateModel>, { payload }: SetLocation) {
    setState({ ...getState(), location: payload });
  }

  @Action(SetDistance)
  setDistance({ getState, setState }: StateContext<FilterStateModel>, { payload }: SetDistance) {
    setState({ ...getState(), distance: payload });
  }

  @Action(SetRating)
  setRating({ getState, setState }: StateContext<FilterStateModel>, { payload }: SetRating) {
    setState({ ...getState(), rating: payload });
  }

  @Action(SetReviews)
  setRevSetReviews({ getState, setState }: StateContext<FilterStateModel>, { payload }: SetReviews) {
    setState({ ...getState(), reviews: payload });
  }
}
