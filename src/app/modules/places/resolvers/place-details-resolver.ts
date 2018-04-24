import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Place } from '@app/modules/places/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { GetPlaceDetails } from '../state/places.actions';

@Injectable()
export class PlaceDetailsResolver implements Resolve<Place> {
  constructor(private store: Store, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Place> {
    const placeId = route.paramMap.get('placeId');
    this.store.dispatch(new GetPlaceDetails(placeId));

    return Observable.of(<Place>{ id: placeId });
  }
}
