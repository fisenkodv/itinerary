import { compose } from '@ngrx/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as filterReducers from '../places/redux/filter/filter.reducers';
import * as placesReducers from '../places/redux/places/places.reducers';
import * as searchReducers from '../places/redux/search/search.reducers';

import { IAppState } from './app.state';

export const reducers = {
  places: combineReducers({
    filter: filterReducers.reducer,
    places: placesReducers.reducer,
    search: searchReducers.reducer
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
