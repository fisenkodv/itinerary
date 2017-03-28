import { Component, Input, OnInit } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.scss']
})

export class PlaceListComponent implements OnInit {
  private foundPlaces: PlaceDetails[];

  @Input()
  set places(value: PlaceDetails[]) {
    this.foundPlaces = value;
  }
  get places(): PlaceDetails[] {
    return this.foundPlaces;
  }

  constructor() {
  }

  ngOnInit() { }
}
