// import { Action } from '@ngrx/store';
// import { createSelector } from 'reselect';

// import { Filter } from '../../models/index';
// import * as Places from '../actions/places';

// export interface IState {
//   loading: boolean;
//   filter: Filter;
// }

// export const initialState: IState = {
//   loading: false,
//   filter: null
// };

// export function reducer(state: IState = initialState, action: Places.Actions): IState {
//   switch (action.type) {
//     case Places.SEARCH:
//       const filter = action.payload;
//       return filter !== null
//         ? Object.assign({}, state, { loading: true, filter })
//         : Object.assign({}, state, { loading: false, filter });
//     case Places.SEARCH_COMPLETE:
//       return Object.assign({}, state, { loading: false, filter });
//     default:
//       return state;
//   }
// }

// export const getLoading = (state: IState) => state.loading;
// export const getFilter = (state: IState) => state.filter;
