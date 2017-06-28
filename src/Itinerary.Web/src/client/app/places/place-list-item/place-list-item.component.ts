import { Component, Input, ViewEncapsulation } from '@angular/core';

import { PlaceDetails } from '../models/index';
import { fadeInOut } from '../../shared/animations/fade-in-out';

@Component({
  moduleId: module.id,
  selector: 'place-list-item',
  templateUrl: 'place-list-item.component.html',
  styleUrls: ['place-list-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOut
  ]
})
export class PlaceListItemComponent {
  @Input() public place: PlaceDetails;
  @Input() public isPlaceSelected: boolean;
}
