import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { PlaceDetails } from '../../models/index';
import * as Places from '../actions/places';

export interface IState {
  entities: PlaceDetails[];
}

export const initialState: IState = {
  entities: []
};

export function reducer(state: IState = initialState, action: Places.Actions): IState {
  switch (action.type) {
    case Places.SEARCH_COMPLETE:
      return Object.assign({}, state, { places: action.payload });
    default:
      return state;
  }
}

export const getEntities = (state: IState) => state.entities;
