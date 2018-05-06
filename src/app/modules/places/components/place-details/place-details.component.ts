import { Component, Input } from '@angular/core';
import { Place } from '../../models';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {
  @Input() place: Place;
}
