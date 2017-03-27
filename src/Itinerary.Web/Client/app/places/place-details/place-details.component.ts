import { Component, Input, OnInit } from '@angular/core';

import { Place } from '../../shared';

@Component({
  selector: 'place-details',
  templateUrl: 'place-details.component.html',
  styleUrls: ['place-details.component.scss']
})

export class PlaceDetailsComponent implements OnInit {
  public isPlaceSelected: boolean;
  private selectedPlace: Place;

  @Input()
  set place(value: Place) {
    this.selectedPlace = value;
    this.isPlaceSelected = value != null;
  }
  get place(): Place {
    return this.selectedPlace;
  }

  constructor() {
    this.isPlaceSelected = false;
  }

  ngOnInit() { }
}
