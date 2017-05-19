import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { PlacesCommunicationService, SearchCriteria } from '../places-communication/index';
import { Autocomplete, GooglePlacesService, Location } from '../places/index';

import { IAppState } from '../../redux/reducers/index';
import * as FromRoot from '../../redux/reducers/index';
import * as Filter from '../redux/actions/filter';

@Component({
  moduleId: module.id,
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {

  public searchControl: FormControl;
  public filteredPlaces: Autocomplete[];

  public distance: Observable<number>;
  public rating: Observable<number>;
  public reviews: Observable<number>;

  private location: Observable<Location>;

  constructor(
    private googlePlacesService: GooglePlacesService,
    private store: Store<IAppState>
  ) {
    this.searchControl = new FormControl();
  }

  public ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(keyword as string));

    this.location = this.store.select(FromRoot.getCurrentLocation);
    this.distance = this.store.select(FromRoot.getCurrentDistance);
    this.rating = this.store.select(FromRoot.getCurrentRating);
    this.reviews = this.store.select(FromRoot.getCurrentReviews);

    Observable.combineLatest(this.location, this.distance, this.rating, this.reviews).subscribe(
      (res) => {
        console.log(typeof res);
        console.log(res);
      }
    );

    this.setCurrentPosition();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete !== null && autocomplete.placeId) {
      this.googlePlacesService
        .location(autocomplete.placeId)
        .subscribe((location: Location) => {
          this.store.dispatch(new Filter.SetLocationAction(location));
        });
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
