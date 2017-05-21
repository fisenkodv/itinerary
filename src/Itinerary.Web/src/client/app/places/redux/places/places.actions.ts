import { Action } from '@ngrx/store';
import { Filter, PlaceDetails } from '../../models/index';

export const SEARCH = '[Places] Search';
export const SEARCH_COMPLETE = '[Places] Search Complete';

export class SearchAction implements Action {
  public readonly type = SEARCH;

  constructor(public payload: Filter) { }
}

export class SearchCompleteAction implements Action {
  public readonly type = SEARCH_COMPLETE;

  constructor(public payload: PlaceDetails[]) { }
}

export type Actions =
  SearchAction |
  SearchCompleteAction;
