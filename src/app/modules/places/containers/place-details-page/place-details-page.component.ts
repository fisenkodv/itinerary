import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Place } from '../../models';
import { GetPlaceDetails } from '../../state/places.actions';
import { PlacesState } from '../../state/places.state';

@Component({
  selector: 'app-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit {
  @Select(PlacesState.loading) loading$: Observable<boolean>;
  @Select(PlacesState.selectedPlace) place$: Observable<Place>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    this.store.dispatch(new GetPlaceDetails(placeId));
  }
}
