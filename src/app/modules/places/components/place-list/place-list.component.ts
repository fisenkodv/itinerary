import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PlaceDetails } from '../../models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.scss']
})
export class PlaceListComponent implements OnInit, OnDestroy {
  @Input() public places: Observable<PlaceDetails[]>;
  @Input() public selectedPlaces: Observable<PlaceDetails[]>;

  private destroy: Subject<void> = new Subject<void>();
  private selectedPlace: PlaceDetails;

  constructor(private hostElement: ElementRef) {
    this.selectedPlace = null;
  }

  public ngOnInit(): void {
    this.selectedPlaces
      .takeUntil(this.destroy)
      .subscribe((selectedPlaces: PlaceDetails[]) => {
        if (selectedPlaces.length) {
          this.selectPlaceListItem(selectedPlaces[0]);
        }
      });
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
    if (element) {
      this.hostElement.nativeElement.scrollTop = element.offsetTop - 1;
    }
  }
}
