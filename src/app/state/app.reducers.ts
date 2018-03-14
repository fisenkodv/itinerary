import { InjectionToken } from '@angular/core';
import { combineReducers } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';

import * as filterReducers from '../modules/places/state/filter/filter.reducers';
import * as mapReducers from '../modules/places/state/map/map.reducers';
import * as placesReducers from '../modules/places/state/places/places.reducers';
import { IAppState } from './app.state';

export const reducers = combineReducers({
  filter: filterReducers.reducer,
  places: placesReducers.reducer,
  map: mapReducers.reducer
});

export const reducerToken = new InjectionToken<ActionReducerMap<IAppState>>('Reducers');

export function getReducers() {
  return {
    places: reducers,
  };
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers }
];
