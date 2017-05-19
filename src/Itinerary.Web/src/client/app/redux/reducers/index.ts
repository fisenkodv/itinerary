import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as Filter from '../../places/redux/reducers/filter';

export interface IAppState {
  filter: Filter.IState;
}

export const InitialState: IAppState = {
  filter: Filter.initialState
};

export const reducers = {
  filter: Filter.reducer
};

const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
  if (String('<%= BUILD_TYPE %>') === 'dev') {
    return developmentReducer(state, action);
  } else {
    return productionReducer(state, action);
  }
}

export const getFilterState = (state: IAppState) => state.filter;

export const getCurrentLocation = createSelector(getFilterState, Filter.getLocation);
export const getCurrentDistance = createSelector(getFilterState, Filter.getDistance);
export const getCurrentRating = createSelector(getFilterState, Filter.getRating);
export const getCurrentReviews = createSelector(getFilterState, Filter.getReviews);
