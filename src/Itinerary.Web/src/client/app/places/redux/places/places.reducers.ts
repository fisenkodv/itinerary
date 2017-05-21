import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { PlaceDetails } from '../../models/index';
import * as placesActions from './places.actions';

export interface IState {
  entities: PlaceDetails[];
}

export const initialState: IState = {
  entities: []
};

export function reducer(state: IState = initialState, action: placesActions.Actions): IState {
  switch (action.type) {
    case placesActions.SEARCH_COMPLETE:
      return Object.assign({}, state, { entities: action.payload });
    default:
      return state;
  }
}

export const getEntities = (state: IState) => state.entities;
