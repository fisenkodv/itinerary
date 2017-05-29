import { Filter, Location } from '../../models/index';
import * as filterActions from './filter.actions';

export interface IState {
  location: Location;
  distance: number;
  rating: number;
  reviews: number;
}

export const initialState: IState = {
  // default location is 'Geographic center of the contiguous United States'
  location: new Location(39.833333, -98.583333),
  distance: 50,
  rating: 4.0,
  reviews: 250,
};

export function reducer(state: IState = initialState, action: filterActions.Actions): IState {
  switch (action.type) {
    case filterActions.SET_LOCATION:
      return Object.assign({}, state, { location: action.payload });
    case filterActions.SET_DISTANCE:
      return Object.assign({}, state, { distance: action.payload });
    case filterActions.SET_RATING:
      return Object.assign({}, state, { rating: action.payload });
    case filterActions.SET_REVIEWS:
      console.log(state);
      return Object.assign({}, state, { reviews: action.payload });
    default:
      return state;
  }
}

export const getLocation = (state: IState) => state.location;
export const getDistance = (state: IState) => state.distance;
export const getRating = (state: IState) => state.rating;
export const getReviews = (state: IState) => state.reviews;
export const getFilter = (state: IState) => new Filter(state.location, state.distance, state.rating, state.reviews);
