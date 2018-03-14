import { Component, Input, ViewEncapsulation } from '@angular/core';

import { PlaceDetails } from '../../models';
import { fadeInOut } from '@app/animations';

@Component({
  moduleId: module.id,
  selector: 'place-list-item',
  templateUrl: 'place-list-item.component.html',
  styleUrls: ['place-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOut
  ]
})
export class PlaceListItemComponent {
  @Input() public place: PlaceDetails;
  @Input() public isPlaceSelected: boolean;
}
