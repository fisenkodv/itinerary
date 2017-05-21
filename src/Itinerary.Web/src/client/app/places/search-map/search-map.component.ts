import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/takeWhile';

import { IAppState } from '../../redux/app.state';
import * as FromRoot from '../redux/index';

import { Filter, PlaceDetails } from '../models/index';
import { MapPlaceDetails } from './map-place-details';

@Component({
  moduleId: module.id,
  selector: 'search-map',
  templateUrl: 'search-map.component.html',
  styleUrls: ['search-map.component.css']
})
export class SearchMapComponent implements OnDestroy {
  public zoom: number;
  public showBasePoint: boolean;
  public places: Observable<MapPlaceDetails[]>;
  public filter: Filter;

  private defaultZoom = 5;
  private defaultZoomForSelectedPoint = 8;
  private selectedPlaces: string[];
  private alive: boolean = true;

  constructor(private store: Store<IAppState>) {
    this.places = this.store.select(FromRoot.getPlaceEntities).map(this.searchResultsCallBack);
    this.store.select(FromRoot.getFilterFilter)
      .takeWhile(() => this.alive)
      .subscribe((filter) => this.filter = filter);

    this.showBasePoint = true;
    this.zoom = this.defaultZoom;
    this.selectedPlaces = [];
  }

  public radiusInMeters() {
    return this.filter.distance * 1609.34;
  }

  public markerClick(place: MapPlaceDetails) {
    // this.placesCommunicationService.select(place);
    // this.places.forEach((x) => {
    //   x.wasSelected = x.wasSelected || x.isSelected;
    //   x.isSelected = false;
    // });
    // place.isSelected = true;
  }

  public ngOnDestroy(): void {
    this.alive = false;
    // this.placesSubscription.unsubscribe();
    // this.searchCriteriaSubscription.unsubscribe();
  }

  private searchResultsCallBack(places: PlaceDetails[]): MapPlaceDetails[] {
    this.showBasePoint = places.some(() => true);
    this.zoom = this.showBasePoint ? this.defaultZoomForSelectedPoint : this.zoom;

    // this.setPreviousSelectedPlaces(places);
    return places.map((place) => new MapPlaceDetails(false, false, place));
  }

  private setPreviousSelectedPlaces(places: PlaceDetails[]) {
    // const selected = this.places
    //   .filter((place) => place.wasSelected || place.isSelected)
    //   .map((place) => place.name);
    // this.selectedPlaces = [...selected, ...this.selectedPlaces];
  }

  private wasSelected(place: PlaceDetails): boolean {
    return this.selectedPlaces.some((x) => x === place.name);
  }
}
