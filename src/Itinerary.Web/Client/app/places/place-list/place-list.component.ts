import { Component, Input, OnInit } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'place-list',
  templateUrl: 'place-list.component.html',
  styleUrls: ['place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  @Input()
  public places: PlaceDetails[];

  constructor() {
    this.places = [];
  }

  ngOnInit() {}
}
