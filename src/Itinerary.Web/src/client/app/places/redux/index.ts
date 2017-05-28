import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as filterReducers from './filter/filter.reducers';
import * as placesReducers from './places/places.reducers';
import * as searchReducers from './search/search.reducers';

import { IAppState } from '../../redux/app.state';

export interface IPlacesState {
  filter: filterReducers.IState;
  places: placesReducers.IState;
  search: searchReducers.IState;
}

export const InitialState: IPlacesState = {
  filter: filterReducers.initialState,
  places: placesReducers.initialState,
  search: searchReducers.initialState
};

export const getFilterState = (state: IAppState) => state.places.filter;
export const getFilterLocation = createSelector(getFilterState, filterReducers.getLocation);
export const getFilterDistance = createSelector(getFilterState, filterReducers.getDistance);
export const getFilterRating = createSelector(getFilterState, filterReducers.getRating);
export const getFilterReviews = createSelector(getFilterState, filterReducers.getReviews);
export const getFilterFilter = createSelector(getFilterState, filterReducers.getFilter);

export const getPlacesState = (state: IAppState) => state.places.places;
export const getPlaceEntities = createSelector(getPlacesState, placesReducers.getEntities);

export const getSearchState = (state: IAppState) => state.places.search;
export const getSearchLoading = createSelector(getSearchState, searchReducers.getLoading);
