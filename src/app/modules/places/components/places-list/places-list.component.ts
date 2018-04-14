import { Component, OnInit } from '@angular/core';
import { Place } from '@app/modules/places/models';
import { PlacesState } from '@app/modules/places/state/places.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-places-list',
  templateUrl: 'places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  @Select(PlacesState.places) places$: Observable<Place>;
  @Select(PlacesState.loading) loading$: Observable<boolean>;

  constructor() {}

  ngOnInit() {}

  public trackPlace(place: Place): string {
    return place.id;
  }
}
