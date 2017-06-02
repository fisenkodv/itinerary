import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';

import { IAppState } from '../../redux/app.state';
import * as FromRoot from '../redux/index';

import { PlaceDetails } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.css']
})
export class PlaceListComponent implements OnDestroy {
  public places: Observable<PlaceDetails[]>;

  private destroy: Subject<void> = new Subject<void>();
  private selectedPlace: PlaceDetails;

  constructor(
    private store: Store<IAppState>,
    private hostElement: ElementRef) {
    this.places = this.store.select(FromRoot.getPlaceEntities);
    this.store.select(FromRoot.getSelectedPlaceEntities)
      .takeUntil(this.destroy)
      .subscribe((selectedPlaces) => {
        if (selectedPlaces.length) {
          this.selectPlaceListItem(selectedPlaces[0]);
        }
      });
    this.selectedPlace = null;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
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
    const element = document.getElementById(this.getPlaceListItemId(place));
    if (element)
      this.hostElement.nativeElement.scrollTop = element.offsetTop - 1;
  }
}
