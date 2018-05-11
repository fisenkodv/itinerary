import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Place } from '../../models';

@Component({
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html',
  styleUrls: ['./places-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesListComponent {
  @Input() public places: Place[];

  public trackPlace(place: Place): string {
    return place.id;
  }
}
