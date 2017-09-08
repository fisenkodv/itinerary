import { Action } from '@ngrx/store';
import { Location } from '../../models/index';

export const SET_LOCATION = '[Filter] Set location';
export const SET_DISTANCE = '[Filter] Set distance';
export const SET_RATING = '[Filter] Set rating';

export class SetLocationAction implements Action {
  public readonly type = SET_LOCATION;

  constructor(public payload: Location) { }
}

export class SetDistanceAction implements Action {
  public readonly type = SET_DISTANCE;

  constructor(public payload: number) { }
}

export class SetRatingAction implements Action {
  public readonly type = SET_RATING;

  constructor(public payload: number) { }
}

export type Actions = SetLocationAction
  | SetDistanceAction
  | SetRatingAction;
