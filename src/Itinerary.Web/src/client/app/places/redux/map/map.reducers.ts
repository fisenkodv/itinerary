import * as placesActions from '../places/places.actions';

export interface IState {
  zoom: number;
}

export const initialState: IState = {
  zoom: 5
};

export function reducer(state: IState = initialState, action: placesActions.Actions): IState {
  switch (action.type) {
    case placesActions.GET_PLACES:
      return Object.assign({}, state, { zoom: 8 });
    default:
      return state;
  }
}

export const getZoom = (state: IState) => state.zoom;
