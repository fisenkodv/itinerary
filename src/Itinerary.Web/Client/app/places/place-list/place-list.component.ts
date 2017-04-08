import { Component, Input, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlaceDetails } from '../../shared';
import { PlacesCommunicationService } from '../places-communication.service';

@Component({
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.scss']
})
export class PlaceListComponent implements OnDestroy {
  private placesSubscription: Subscription;
  private selectedPlaceSubscription: Subscription;
  private selectedPlace: PlaceDetails;

  public places: PlaceDetails[];

  constructor(
    private hostElement: ElementRef,
    private placesCommunicationService: PlacesCommunicationService) {
    this.placesSubscription = placesCommunicationService
      .places
      .subscribe((places) => this.places = places);
    this.selectedPlaceSubscription = placesCommunicationService
      .selectedPlace
      .subscribe((place) => this.selectPlaceListItem(place));
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }

  public getPlaceListItemId(place: PlaceDetails): string {
    const index = this.places.findIndex((p) => p.name === place.name);
    return `place-${index}`;
  }

  public isPlaceListItemSelected(place: PlaceDetails): boolean {
    return this.selectedPlace != null ? place.name == this.selectedPlace.name : false;
  }

  private selectPlaceListItem(place: PlaceDetails) {
    this.selectedPlace = place;
    this.hostElement.nativeElement.scrollTop = document.getElementById(this.getPlaceListItemId(place)).offsetTop - 1;
  }
}
