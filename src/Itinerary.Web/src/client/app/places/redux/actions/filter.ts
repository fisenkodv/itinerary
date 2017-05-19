import { Action } from '@ngrx/store';
import { Location } from '../../models/index';

export const SET_LOCATION = '[Places] Set location';
export const SET_DISTANCE = '[Places] Set distance';
export const SET_RATING = '[Places] Set rating';
export const SET_REVIEWS = '[Places] Set review';

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

export class SetReviewsAction implements Action {
  public readonly type = SET_REVIEWS;

  constructor(public payload: number) { }
}

export type Actions = SetLocationAction
  | SetDistanceAction
  | SetRatingAction
  | SetReviewsAction;
