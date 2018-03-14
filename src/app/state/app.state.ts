import * as Places from '../modules/places/state';

export interface IAppState {
  places: Places.IPlacesState;
}

export const InitialState: IAppState = {
  places: Places.InitialState
};
