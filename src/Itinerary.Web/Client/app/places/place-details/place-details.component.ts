import { Component, Input, OnInit } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'place-details',
  templateUrl: 'place-details.component.html',
  styleUrls: ['place-details.component.scss']
})

export class PlaceDetailsComponent implements OnInit {
  public isPlaceSelected: boolean;
  private selectedPlace: PlaceDetails;

  @Input()
  set place(value: PlaceDetails) {
    this.isPlaceSelected = value != null;
    this.selectedPlace = value;
  }
  get place(): PlaceDetails {
    return this.selectedPlace;
  }

  constructor() {
    this.isPlaceSelected = false;
  }

  ngOnInit() { }
}
