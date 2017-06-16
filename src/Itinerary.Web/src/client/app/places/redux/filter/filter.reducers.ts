import { Filter, Location } from '../../models/index';
import * as filterActions from './filter.actions';

export interface IState {
  location: Location;
  distance: number;
  rating: number;
  reviews: number;
}

export const initialState: IState = {
  location: Location.createDefault(),
  distance: 50,
  rating: 4.0,
  reviews: 250
};

export function reducer(state: IState = initialState, action: filterActions.Actions): IState {
  switch (action.type) {
    case filterActions.SET_LOCATION:
      return Object.assign({}, state, {isDefault: false, location: action.payload});
    case filterActions.SET_DISTANCE:
      return Object.assign({}, state, {isDefault: false, distance: action.payload});
    case filterActions.SET_RATING:
      return Object.assign({}, state, {isDefault: false, rating: action.payload});
    case filterActions.SET_REVIEWS:
      return Object.assign({}, state, {isDefault: false, reviews: action.payload});
    default:
      return state;
  }
}

export const getLocation = (state: IState) => state.location;
export const getDistance = (state: IState) => state.distance;
export const getRating = (state: IState) => state.rating;
export const getReviews = (state: IState) => state.reviews;
export const getFilter = (state: IState) => new Filter(state.location, state.distance, state.rating, state.reviews);
