import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';

import { IAppState } from '../../redux/app.state';
import * as filterActions from '../redux/filter/filter.actions';
import * as fromModule from '../redux/index';
import * as placesActions from '../redux/places/places.actions';

import { Autocomplete, Location } from '../models/index';
import { GooglePlacesService } from '../places/index';

@Component({
  moduleId: module.id,
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.css']
})
export class SearchPanelComponent implements OnDestroy, OnInit {
  public searchControl: FormControl;
  public filteredPlaces: Observable<Autocomplete[]>;

  public distance: Observable<number>;
  public rating: Observable<number>;
  public reviews: Observable<number>;

  private destroy: Subject<void> = new Subject<void>();

  constructor(
    private googlePlacesService: GooglePlacesService,
    private store: Store<IAppState>) {
    this.searchControl = new FormControl();
  }

  public ngOnInit() {
    this.filteredPlaces = this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(keyword as string));

    this.distance = this.store.select(fromModule.getFilterDistance);
    this.rating = this.store.select(fromModule.getFilterRating);
    this.reviews = this.store.select(fromModule.getFilterReviews);
    Observable.combineLatest(
      this.store.select(fromModule.getFilterFilter),
      this.store.select(fromModule.isDefaultFilter),
      (filter, isDefaultFilter) => {
        return { filter, isDefaultFilter };
      })
      .takeUntil(this.destroy)
      .filter((combinedResult) => !combinedResult.isDefaultFilter)
      .subscribe((combinedResult) =>
        this.store.dispatch(new placesActions.GetPlacesAction(combinedResult.filter)));

    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy.next();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete !== null && autocomplete.placeId) {
      this.googlePlacesService
        .location(autocomplete.placeId)
        .subscribe((location: Location) => {
          this.store.dispatch(new filterActions.SetLocationAction(location));
        });
      // TODO: unsubscribe
      // .unsubscribe();
    }
    return autocomplete ? autocomplete.description : '';
  }

  public changeDistanceHandler({ value }: any) {
    this.store.dispatch(new filterActions.SetDistanceAction(value));
  }

  public changeRatingHandler({ value }: any) {
    this.store.dispatch(new filterActions.SetRatingAction(value));
  }

  public changeReviewsHandler({ value }: any) {
    this.store.dispatch(new filterActions.SetReviewsAction(value));
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new Location(position.coords.latitude, position.coords.longitude);
        this.store.dispatch(new filterActions.SetLocationAction(location));
      });
    }
  }
}
