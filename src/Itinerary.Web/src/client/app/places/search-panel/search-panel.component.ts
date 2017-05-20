import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';

import { IAppState } from '../../redux/reducers/index';
import * as FromRoot from '../../redux/reducers/index';
import * as Filter from '../redux/actions/filter';
import * as Places from '../redux/actions/places';

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

  private alive: boolean = true;

  constructor(
    private googlePlacesService: GooglePlacesService,
    private store: Store<IAppState>) {
    this.searchControl = new FormControl();
  }

  public ngOnInit() {
    this.filteredPlaces =  this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(keyword as string));

    this.distance = this.store.select(FromRoot.getFilterDistance);
    this.rating = this.store.select(FromRoot.getFilterRating);
    this.reviews = this.store.select(FromRoot.getFilterReviews);
    this.store.select(FromRoot.getFilterFilter)
      .takeWhile(() => this.alive)
      .subscribe((filter) =>
        this.store.dispatch(new Places.SearchAction(filter)));

    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete !== null && autocomplete.placeId) {
      this.googlePlacesService
        .location(autocomplete.placeId)
        .subscribe((location: Location) => {
          this.store.dispatch(new Filter.SetLocationAction(location));
        });
        //.unsubscribe();
    }
    return autocomplete ? autocomplete.description : '';
  }

  public changeDistanceHandler({ value }: any) {
    this.store.dispatch(new Filter.SetDistanceAction(value));
  }

  public changeRatingHandler({ value }: any) {
    this.store.dispatch(new Filter.SetRatingAction(value));
  }

  public changeReviewsHandler({ value }: any) {
    this.store.dispatch(new Filter.SetReviewsAction(value));
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new Location(position.coords.latitude, position.coords.longitude);
        this.store.dispatch(new Filter.SetLocationAction(location));
      });
    }
  }
}
