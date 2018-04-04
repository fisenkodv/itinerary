import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { SetDistance, SetLocation, SetRating, SetReviews } from '@app/modules/places/state/filter.actions';
import { FilterStateModel } from '@app/modules/places/state/filter.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Autocomplete } from '../../models';
import { GooglePlacesService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-place-search',
  templateUrl: 'place-search.component.html',
  styleUrls: ['place-search.component.scss']
})
export class PlaceSearchComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public placeCtrl: FormControl;
  public filteredPlaces: Observable<Autocomplete[]>;

  @Select(state => state.places.filter)
  filter$: Observable<FilterStateModel>;

  constructor(private store: Store, private googleService: GooglePlacesService) {
    this.placeCtrl = new FormControl();
  }

  public ngOnInit() {
    this.filteredPlaces = this.placeCtrl.valueChanges.pipe(switchMap(value => this.autocomplete(value)));

    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public autocomplete(keyword: string): Observable<Autocomplete[]> {
    return this.googleService.autocomplete(keyword);
  }

  public displayPlace(place?: Autocomplete): string | undefined {
    return place ? place.description : undefined;
  }

  public selectPlace(event: MatAutocompleteSelectedEvent) {
    this.googleService.place((<Autocomplete>event.option.value).id).subscribe(x => {
      this.store.dispatch(new SetLocation(x.location));
    });
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

  private setCurrentPosition() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const location = new Location(position.coords.latitude, position.coords.longitude);
    //     this.store.dispatch(new filterActions.SetLocationAction(location));
    //   });
    // }
  }
}
