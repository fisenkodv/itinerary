import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as Filter from './reducers/filter';
import * as Places from './reducers/places';
import * as Search from './reducers/search';

import { IAppState } from '../../redux/reducers/index';

export interface IPlacesState {
  filter: Filter.IState;
  places: Places.IState;
  search: Search.IState;
}

export const InitialState: IPlacesState = {
  filter: Filter.initialState,
  places: Places.initialState,
  search: Search.initialState
};

// export * from './reducers/filter';
// export * from './reducers/places';
// export * from './reducers/search';

export const getFilterState = (state: IAppState) => state.places.filter;
export const getFilterLocation = createSelector(getFilterState, Filter.getLocation);
export const getFilterDistance = createSelector(getFilterState, Filter.getDistance);
export const getFilterRating = createSelector(getFilterState, Filter.getRating);
export const getFilterReviews = createSelector(getFilterState, Filter.getReviews);
export const getFilterFilter = createSelector(getFilterState, Filter.getFilter);

export const getPlacesState = (state: IAppState) => state.places.places;
export const getPlaceEntities = createSelector(getPlacesState, Places.getEntities);

export const getSearchState = (state: IAppState) => state.places.search;
export const getSearchLoading = createSelector(getSearchState, Search.getLoading);
export const getSearchFilter = createSelector(getSearchState, Search.getFilter);
