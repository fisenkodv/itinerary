import * as Places from '../places/redux/index';

export interface IAppState {
  places: Places.IPlacesState;
}

export const InitialState: IAppState = {
  places: Places.InitialState
};
