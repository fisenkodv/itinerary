import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IAppState } from '../../../../state/app.state';
import { Autocomplete, Filter, Location } from '../../models';
import { GooglePlacesService } from '../../services';
import * as filterActions from '../../state/filter/filter.actions';
import * as placesActions from '../../state/places/places.actions';

@Component({
  moduleId: module.id,
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnDestroy, OnInit {
  public searchControl: FormControl;
  public filteredPlaces: Observable<Autocomplete[]>;
  @Input() public filter: Observable<Filter>;

  private destroy: Subject<void> = new Subject<void>();

  constructor(private googlePlacesService: GooglePlacesService,
    private store: Store<IAppState>) {
    this.searchControl = new FormControl();
  }

  public ngOnInit() {
    this.filteredPlaces = this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(keyword as string));
    this.filter
      .filter((filter) => !filter.location.isDefault)
      .takeUntil(this.destroy)
      .subscribe((filter) =>
        this.store.dispatch(new placesActions.GetPlacesAction(filter)));

    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy.next();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete !== null && autocomplete.name) {
      this.store.dispatch(new filterActions.SetLocationAction(autocomplete.location));
    }
    return autocomplete ? autocomplete.name : '';
  }

  public changeDistanceHandler({ value }: any) {
    this.store.dispatch(new filterActions.SetDistanceAction(value));
  }

  public changeRatingHandler({ value }: any) {
    this.store.dispatch(new filterActions.SetRatingAction(value));
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
