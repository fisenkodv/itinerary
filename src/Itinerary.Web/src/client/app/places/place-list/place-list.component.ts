import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PlacesCommunicationService } from '../places-communication/places-communication.service';
import { PlaceDetails } from '../places/models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.css']
})
export class PlaceListComponent {
  public places: Observable<PlaceDetails[]>;

  private selectedPlaceSubscription: Subscription;
  private selectedPlace: PlaceDetails;

  constructor(
    private hostElement: ElementRef,
    private placesCommunicationService: PlacesCommunicationService) {
    this.selectedPlace = null;

    this.places = placesCommunicationService.places;

    this.selectedPlaceSubscription = placesCommunicationService
      .selectedPlace
      .subscribe((place) => this.selectPlaceListItem(place));
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
