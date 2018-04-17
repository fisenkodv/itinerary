import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Place } from '@app/modules/places/models';
import { InfoWindow } from '@agm/core/services/google-maps-types';

@Component({
  moduleId: module.id,
  selector: 'app-places-map',
  templateUrl: 'places-map.component.html',
  styleUrls: ['./places-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesMapComponent {
  private selectedPlaces: Place[] = [];
  private infoWindow: InfoWindow;

  @Input() public places: Place[];
  @Input() public location: Location;
  @Input() public distance: number;

  public getRadius(): number {
    return this.distance * 1609.34;
  }

  public get hasData(): boolean {
    return this.places.length !== 0;
  }

  public markerClick(place: Place, infoWindow: InfoWindow) {
    this.selectedPlaces.push(place);

    if (this.infoWindow === infoWindow) {
      return;
    } else if (this.infoWindow !== undefined) {
      this.infoWindow.close();
    }

    this.infoWindow = infoWindow;
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
    return this.selectedPlaces.findIndex(selectedPlace => selectedPlace.name === place.name);
  }
}
