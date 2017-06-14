import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as filterReducers from '../places/redux/filter/filter.reducers';
import * as mapReducers from '../places/redux/map/map.reducers';
import * as placesReducers from '../places/redux/places/places.reducers';

import { IAppState } from './app.state';

export const reducers = {
  places: combineReducers({
    filter: filterReducers.reducer,
    places: placesReducers.reducer,
    map: mapReducers.reducer
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
