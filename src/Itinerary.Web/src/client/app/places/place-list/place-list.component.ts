import { Component, ElementRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../../redux/reducers/index';
import * as FromRoot from '../../redux/reducers/index';

import { PlaceDetails } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.css']
})
export class PlaceListComponent {
  public places: Observable<PlaceDetails[]>;

  private selectedPlace: PlaceDetails;

  constructor(
    private store: Store<IAppState>,
    private hostElement: ElementRef) {
    this.selectedPlace = null;

    this.places = this.store.select(FromRoot.getPlaceEntities);
  }

  public isPlaceListItemSelected(place: PlaceDetails): boolean {
    return this.selectedPlace !== null ? place.name === this.selectedPlace.name : false;
  }

  public getPlaceListItemId(place: PlaceDetails): string {
    return `${place.rating}${place.reviews}${place.location.latitude}${place.location.longitude}`
      .replace(/\D/g, '');
  }

  public trackPlace(index: number, place: PlaceDetails): string {
    return place ? place.name : undefined;
  }

  private selectPlaceListItem(place: PlaceDetails) {
    this.selectedPlace = place;
    this.hostElement.nativeElement.scrollTop = document.getElementById(this.getPlaceListItemId(place)).offsetTop - 1;
  }
}
