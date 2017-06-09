import { PlaceDetails } from '../../models/index';
import * as placesActions from './places.actions';

export interface IState {
  entities: PlaceDetails[];
  selectedEntities: PlaceDetails[];
  loading: boolean;
}

export const initialState: IState = {
  entities: [],
  selectedEntities: [],
  loading: false
};

export function reducer(state: IState = initialState, action: placesActions.Actions): IState {
  switch (action.type) {
    case placesActions.GET_PLACES:
      return Object.assign({}, state, { entities: [], loading: true });
    case placesActions.GET_PLACES_COMPLETE:
      return Object.assign({}, state, { entities: action.payload, loading: false });
    case placesActions.SELECT_PLACE:
      const places = [action.payload, ...state.selectedEntities];
      return Object.assign({}, state, { selectedEntities: places });
    default:
      return state;
  }
}

export const getEntities = (state: IState) => state.entities;
export const getLoading = (state: IState) => state.loading;
export const getSelectedEntities = (state: IState) => state.selectedEntities;
