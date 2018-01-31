import { combineReducers } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';

import * as filterReducers from '../places/redux/filter/filter.reducers';
import * as mapReducers from '../places/redux/map/map.reducers';
import * as placesReducers from '../places/redux/places/places.reducers';
import { IAppState } from './app.state';

export const reducers: ActionReducerMap<IAppState> = {
  places: combineReducers({
    filter: filterReducers.reducer,
    places: placesReducers.reducer,
    map: mapReducers.reducer
  })
};
