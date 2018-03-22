import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'app-place-search',
  templateUrl: 'place-search.component.html',
  styleUrls: ['place-search.component.scss'],
})
export class PlaceSearchComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {}

  public ngOnInit() {
    this.setCurrentPosition();
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  private setCurrentPosition() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const location = new Location(position.coords.latitude, position.coords.longitude);
    //     this.store.dispatch(new filterActions.SetLocationAction(location));
    //   });
    // }
  }
}
