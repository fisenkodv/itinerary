import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { GetAutocomplete, SelectPlace } from '@app/modules/places/state/autocomplete.actions';
import { AutocompleteState } from '@app/modules/places/state/autocomplete.state';
import { SetDistance, SetLocation, SetRating, SetReviews } from '@app/modules/places/state/filter.actions';
import { FilterState, FilterStateModel } from '@app/modules/places/state/filter.state';
import { GetPlaces } from '@app/modules/places/state/places.actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { GooglePlacesAutocomplete, GooglePlacesPlace } from '../../models';
import { GooglePlacesService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public placeCtrl: FormControl = new FormControl();

  @Select(FilterState.filter) filter$: Observable<FilterStateModel>;
  @Select(AutocompleteState.items) items$: Observable<GooglePlacesAutocomplete[]>;
  @Select(AutocompleteState.selected) selected$: Observable<GooglePlacesPlace>;

  constructor(private store: Store, private googleService: GooglePlacesService) {}

  public ngOnInit() {
    this.placeCtrl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        filter(value => typeof value === 'string' && value.trim() !== ''),
        switchMap(value => this.store.dispatch(new GetAutocomplete(value)))
      )
      .subscribe(_ => true);

    this.selected$
      .pipe(
        takeUntil(this.destroy$),
        filter(value => !!value),
        switchMap(value => this.store.dispatch(new SetLocation(value.location)))
      )
      .subscribe(_ => true);

    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public displayPlace(place?: GooglePlacesAutocomplete): string | undefined {
    return place ? place.description : undefined;
  }

  public selectPlace(event: MatAutocompleteSelectedEvent) {
    this.store.dispatch(new SelectPlace((<GooglePlacesAutocomplete>event.option.value).id));
  }

  public changeDistanceHandler(value: number) {
    this.store.dispatch(new SetDistance(value));
  }
  public changeRatingHandler(value: number) {
    this.store.dispatch(new SetRating(value));
  }
  public changeReviewsHandler(value: number) {
    this.store.dispatch(new SetReviews(value));
  }

  public search() {
    this.store.dispatch(new GetPlaces());
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.store.dispatch([
          new SetLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
          new GetPlaces()
        ]);
      });
    }
  }
}
