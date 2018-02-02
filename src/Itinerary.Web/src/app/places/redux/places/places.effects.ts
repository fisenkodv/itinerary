import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Filter } from '../../models';
import { PlacesService } from '../../places';
import * as placesActions from './places.actions';

@Injectable()
export class FilterEffects {
  @Effect()
  public search: Observable<Action> = this.actions
    .ofType(placesActions.GET_PLACES)
    .debounceTime(300)
    .map((action: placesActions.GetPlacesAction) => {
      return action.payload;
    })
    .switchMap((filter: Filter) => {
      if (filter === null) {
        return empty();
      }

      const nextSearch = this.actions.ofType(placesActions.GET_PLACES).skip(1);

      return this.placesService.search(filter)
        .takeUntil(nextSearch)
        .map((places) => new placesActions.GetPlacesCompleteAction(places))
        .catch((error) => of(new placesActions.GetPlacesCompleteAction([])));
    });

  constructor(private actions: Actions, private placesService: PlacesService) {
  }
}
