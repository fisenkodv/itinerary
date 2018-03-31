import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators';

import { GoogleAutocomplete } from '../../models';
import { GooglePlacesService } from '../../services';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-place-search',
  templateUrl: 'place-search.component.html',
  styleUrls: ['place-search.component.scss']
})
export class PlaceSearchComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public placeCtrl: FormControl;
  public filteredPlaces: Observable<GoogleAutocomplete[]>;

  constructor(private googleService: GooglePlacesService) {
    this.placeCtrl = new FormControl();
  }

  public ngOnInit() {
    this.filteredPlaces = this.placeCtrl.valueChanges.pipe(switchMap(value => this.autocomplete(value)));
    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public autocomplete(keyword: string): Observable<GoogleAutocomplete[]> {
    return this.googleService.autocomplete(keyword);
  }

  public displayPlace(place?: GoogleAutocomplete): string | undefined {
    return place ? place.description : undefined;
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
