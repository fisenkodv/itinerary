import { Action } from '@ngrx/store';
import { Filter, PlaceDetails } from '../../models/index';

export const GET_PLACES = '[Places] Get Places';
export const GET_PLACES_COMPLETE = '[Places] Get Places Complete';
export const SELECT_PLACE = '[Places] Select Place';

export class GetPlacesAction implements Action {
  public readonly type = GET_PLACES;

  constructor(public payload: Filter) {
  }
}

export class GetPlacesCompleteAction implements Action {
  public readonly type = GET_PLACES_COMPLETE;

  constructor(public payload: PlaceDetails[]) {
  }
}

export class SelectPlaceAction implements Action {
  public readonly type = SELECT_PLACE;

  constructor(public payload: PlaceDetails) {
  }
}

export type Actions =
  GetPlacesAction |
  GetPlacesCompleteAction |
  SelectPlaceAction;
