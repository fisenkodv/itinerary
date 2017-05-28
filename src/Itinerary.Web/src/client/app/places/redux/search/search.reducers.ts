import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as placesActions from '../places/places.actions';

export interface IState {
  loading: boolean;
}

export const initialState: IState = {
  loading: false
};

export function reducer(state: IState = initialState, action: placesActions.Actions): IState {
  switch (action.type) {
    case placesActions.SEARCH:
      const loading = action.payload !== null;
      return Object.assign({}, state, { loading: true });
    case placesActions.SEARCH_COMPLETE:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
}

export const getLoading = (state: IState) => state.loading;
