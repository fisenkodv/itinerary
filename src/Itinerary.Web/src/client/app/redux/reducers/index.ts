import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as filter from '../../places/redux/reducers/filter';
import * as places from '../../places/redux/reducers/places';
import * as search from '../../places/redux/reducers/search';

import * as Places from '../../places/redux/index';

export interface IAppState {
  places: Places.IPlacesState;
}

export const InitialState: IAppState = {
  places: Places.InitialState
};

export const reducers = {
  places: combineReducers({
    filter: filter.reducer,
    places: places.reducer,
    search: search.reducer
  })
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

// export const getFilterState = (state: IAppState) => state.places.filter;
// export const getFilterLocation = createSelector(getFilterState, filter.getLocation);
// export const getFilterDistance = createSelector(getFilterState, filter.getDistance);
// export const getFilterRating = createSelector(getFilterState, filter.getRating);
// export const getFilterReviews = createSelector(getFilterState, filter.getReviews);
// export const getFilterFilter = createSelector(getFilterState, filter.getFilter);

// export const getPlacesState = (state: IAppState) => state.places.places;
// export const getPlaceEntities = createSelector(getPlacesState, places.getEntities);

// export const getSearchState = (state: IAppState) => state.places.search;
// export const getSearchLoading = createSelector(getSearchState, search.getLoading);
// export const getSearchFilter = createSelector(getSearchState, search.getFilter);
