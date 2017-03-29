import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PlaceDetails } from '../../shared';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.scss']
})
export class SearchMapComponent {
  private defaultZoom = 5;
  private defaultZoomForSelectedPoint = 8;
  private placesArray: PlaceDetails[];
  private maximumReviews: number;

  public zoom: number;
  public showBasePoint: boolean;
  @Input()
  public latitude: number;
  @Input()
  public longitude: number;
  @Input()
  public distance: number;

  @Input()
  public set places(value: PlaceDetails[]) {
    this.showBasePoint = value.some(() => true);
    this.zoom = this.showBasePoint ? this.defaultZoomForSelectedPoint : this.zoom;
    this.maximumReviews = this.getMaximumReviews(value);
    this.placesArray = value;
  }

  public get places(): PlaceDetails[] {
    return this.placesArray;
  }

  @Output()
  public select: EventEmitter<PlaceDetails> = new EventEmitter();

  constructor() {
    this.distance = 0;
    this.zoom = this.defaultZoom;
    this.places = [];
    this.maximumReviews = 0;
  }

  public placeOpacity(place: PlaceDetails): number {
    return 0.5 + 0.5 * (place.reviews / this.maximumReviews);
  }

  public markerClick(place: PlaceDetails) {
    this.select.emit(place);
  }

  private getMaximumReviews(places: PlaceDetails[]): number {
    return places.some(() => true)
      ? places.map((place) => place.reviews)
      .reduce((a: number, b: number) => {
        return Math.max(a, b);
      })
      : 0;
  }
}
