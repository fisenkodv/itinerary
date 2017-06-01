import { PlaceDetails } from '../../models/index';
import * as placesActions from './places.actions';

export interface IState {
  entities: PlaceDetails[];
  selectedEntities: PlaceDetails[];
}

export const initialState: IState = {
  entities: [],
  selectedEntities: []
};

export function reducer(state: IState = initialState, action: placesActions.Actions): IState {
  switch (action.type) {
    case placesActions.SEARCH_COMPLETE:
      return Object.assign({}, state, { entities: action.payload });
    case placesActions.SELECT_PLACE:
      const places = [...state.selectedEntities, action.payload];
      return Object.assign({}, state, { selectedEntities: places });
    default:
      return state;
  }
}

export const getEntities = (state: IState) => state.entities;
