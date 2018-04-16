import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Place } from '@app/modules/places/models';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-places-map',
  templateUrl: 'places-map.component.html',
  styleUrls: ['./places-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesMapComponent implements OnDestroy, OnInit {
  @Input() public places: Place[];
  @Input() public location: Location;
  @Input() public distance: number;
  // @Input() public selectedPlaces: Observable<PlaceDetails[]>;
  // @Input() public filter: Observable<Filter>;
  // @Input() public zoom: Observable<number>;

  private lastSelectedPlaces: Place[] = [];
  // private destroy: Subject<void> = new Subject<void>();

  // constructor(private store: Store<IAppState>) {}

  public ngOnInit(): void {
    //this.selectedPlaces.takeUntil(this.destroy).subscribe(selectedPlaces => (this.lastSelectedPlaces = selectedPlaces));
  }

  public ngOnDestroy(): void {
    //this.destroy.next();
  }

  public getRadius(): number {
    return this.distance * 1609.34;
  }

  public markerClick(place: Place) {
    //this.store.dispatch(new placesActions.SelectPlaceAction(place));
  }

  public iconUrl(place: Place): string {
    const color = this.selectedIndex(place) >= 0 ? 'blue' : 'red';
    return `/assets/icon/map/generic-${color}-small.png`;
  }

  public opacity(place: Place): number {
    const selectedIndex = this.selectedIndex(place);
    return selectedIndex === 0 ? 1.0 : selectedIndex > 0 ? 0.7 : 0.5;
  }

  private selectedIndex(place: Place): number {
    return this.lastSelectedPlaces.findIndex(selectedPlace => selectedPlace.name === place.name);
  }
}
