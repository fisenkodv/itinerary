import { Component, Input, OnInit } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'place-list-item',
  templateUrl: 'place-list-item.component.html',
  styleUrls: ['place-list-item.component.scss']
})
export class PlaceListItemComponent {
  @Input()
  public place: PlaceDetails;
}
