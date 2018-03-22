import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as fromLayout from '../../modules/core/state/reducers/layout';
import { RouterStateUrl } from '../../shared/utils';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];


export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
