import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '@app/modules/places/models';
import { PlacesState } from '@app/modules/places/state/places.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html',
  styleUrls: ['./places-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesListComponent {
  @Input() public places: Place[];
  @Select(PlacesState.loading) loading$: Observable<boolean>; // TODO: should move out to the parent component

  public trackPlace(place: Place): string {
    return place.id;
  }
}
