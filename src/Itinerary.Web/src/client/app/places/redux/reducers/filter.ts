import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { Location } from '../../places/models/index';

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
  reviews: 50,
};

export function reducer(state = initialState, action: toolbar.Actions) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getLocation = (state: IState) => state.location;
