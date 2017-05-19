import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as Filter from '../../places/redux/reducers/filter';
import * as Places from '../../places/redux/reducers/places';
import * as Search from '../../places/redux/reducers/search';

export interface IAppState {
  filter: Filter.IState;
  places: Places.IState;
  search: Search.IState;
}

export const InitialState: IAppState = {
  filter: Filter.initialState,
  places: Places.initialState,
  search: Search.initialState
};

export const reducers = {
  filter: Filter.reducer,
  places: Places.reducer,
  search: Search.reducer
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
export const getFilterLocation = createSelector(getFilterState, Filter.getLocation);
export const getFilterDistance = createSelector(getFilterState, Filter.getDistance);
export const getFilterRating = createSelector(getFilterState, Filter.getRating);
export const getFilterReviews = createSelector(getFilterState, Filter.getReviews);
export const getFilterFilter = createSelector(getFilterState, Filter.getFilter);

export const getPlacesState = (state: IAppState) => state.places;
export const getPlaceEntities = createSelector(getPlacesState, Places.getEntities);

export const getSearchState = (state: IAppState) => state.search;
export const getSearchLoading = createSelector(getSearchState, Search.getLoading);
export const getSearchFilter = createSelector(getSearchState, Search.getFilter);
