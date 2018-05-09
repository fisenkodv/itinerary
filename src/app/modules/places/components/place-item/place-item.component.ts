import { Component, Input } from '@angular/core';
import { Place } from '@app/modules/places/models';

@Component({
  selector: 'app-place-item',
  templateUrl: 'place-item.component.html',
  styleUrls: ['./place-item.component.scss']
})
export class PlaceItemComponent {
  @Input() place: Place;
}
