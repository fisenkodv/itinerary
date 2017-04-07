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
  private subscription: Subscription;

  public places: PlaceDetails[];

  constructor(private placesCommunicationService: PlacesCommunicationService) {
    this.subscription = placesCommunicationService
      .places
      .subscribe((places) => {
        this.places = places;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
