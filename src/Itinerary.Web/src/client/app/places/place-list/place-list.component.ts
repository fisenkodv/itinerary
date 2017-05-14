import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlacesCommunicationService } from '../places-communication/places-communication.service';
import { PlaceDetails } from '../places/models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.css']
})
export class PlaceListComponent implements OnDestroy {
  public places: PlaceDetails[];

  private placesSubscription: Subscription;
  private selectedPlaceSubscription: Subscription;
  private selectedPlace: PlaceDetails;

  constructor(
    private hostElement: ElementRef,
    private placesCommunicationService: PlacesCommunicationService) {
    this.selectedPlace = null;
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
    return this.selectedPlace !== null ? place.name === this.selectedPlace.name : false;
  }

  public trackPlace(index: number, place: PlaceDetails): string {
    return place ? place.name : undefined;
  }

  private selectPlaceListItem(place: PlaceDetails) {
    this.selectedPlace = place;
    this.hostElement.nativeElement.scrollTop = document.getElementById(this.getPlaceListItemId(place)).offsetTop - 1;
  }
}
