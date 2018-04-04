import { Location } from '@app/modules/places/models';
import { SetDistance, SetLocation, SetRating, SetReviews } from '@app/modules/places/state/filter.actions';
import { Action, State, StateContext } from '@ngxs/store';

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
