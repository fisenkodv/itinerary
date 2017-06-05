import { Action } from '@ngrx/store';
import { Filter, PlaceDetails } from '../../models/index';

export const GET_PLACES = '[Places] Get';
export const SELECT_PLACE = '[Places] Select';

export class GetPlacesAction implements Action {
  public readonly type = GET_PLACES;

  constructor(public payload: PlaceDetails[], public loading: boolean, public error: string) { }
}

export class SelectPlaceAction implements Action {
  public readonly type = SELECT_PLACE;

  constructor(public payload: PlaceDetails) { }
}

export type Actions =
  GetPlacesAction |
  SelectPlaceAction;
