import { Component, Input, OnInit } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'place-details',
  templateUrl: 'place-details.component.html',
  styleUrls: ['place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  @Input()
  public place: PlaceDetails;

  constructor() {
  }

  ngOnInit() {}
}
