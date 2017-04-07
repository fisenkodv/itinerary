import { Component, Input, OnDestroy } from '@angular/core';
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

  public places: PlaceDetails[];
  public selectedPlace: PlaceDetails;

  constructor(private placesCommunicationService: PlacesCommunicationService) {
    this.placesSubscription = placesCommunicationService
      .places
      .subscribe((places) => this.places = places);
    this.selectedPlaceSubscription = placesCommunicationService
      .selectedPlace
      .subscribe((place) => {
        console.dir(place);

        this.selectedPlace = place;
      });
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
  }
}
