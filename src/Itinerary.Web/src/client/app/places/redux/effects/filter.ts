import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Filter } from '../../models/index';
import { PlacesService } from '../../places/index';
import * as Places from '../actions/places';

@Injectable()
export class FilterEffects {
  @Effect()
  public search$: Observable<Action> = this.actions$
    .ofType(Places.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap((filter: Filter) => {
      if (filter === null) {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(Places.SEARCH).skip(1);

      return this.placesService.search(filter)
        .takeUntil(nextSearch$)
        .map((places) => new Places.SearchCompleteAction(places))
        .catch(() => of(new Places.SearchCompleteAction([])));
    });

  constructor(private actions$: Actions, private placesService: PlacesService) { }
}
