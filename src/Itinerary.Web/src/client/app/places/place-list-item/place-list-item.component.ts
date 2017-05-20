import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { PlaceDetails } from '../models/index';

@Component({
  moduleId: module.id,
  selector: 'place-list-item',
  templateUrl: 'place-list-item.component.html',
  styleUrls: ['place-list-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlaceListItemComponent {
  @Input()
  public place: PlaceDetails;
  @Input()
  public isPlaceSelected: boolean;
}
