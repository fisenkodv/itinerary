import { Injectable } from '@angular/core';
import { Location, Place } from '@app/modules/places/models';
import { GeoLocation, GeoLocationMeasurement } from '@app/modules/places/services/geo-location';
import { AngularFirestore, DocumentChangeAction, QueryFn } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { UnaryFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export interface Filter {
  distance: number;
  rating: number;
  reviews: number;
  location: Location;
}

interface FirestorePlace {
  name: string;
  location: firebase.firestore.GeoPoint;
  rating: number;
  reviews: number;
  categories: string[];
  imageUrl: string;
  url: string;
}

@Injectable()
export class ItineraryPlacesService {
  private filter$: Subject<Filter>;
  private places$: Subject<Place[]>;

  constructor(private db: AngularFirestore) {
    this.filter$ = new Subject<Filter>();
    this.places$ = new Subject<Place[]>();
    this.filter$
      .pipe(
        switchMap((filter: Filter) => {
          const [northWestLocation, southEastLocation, baseLocation] = this.getLocationInfo(
            filter.location.latitude,
            filter.location.longitude,
            filter.distance
          );
          return this.db
            .collection<FirestorePlace>('places', this.getQuery(southEastLocation, northWestLocation))
            .snapshotChanges()
            .pipe(
              this.mapToPlaces(baseLocation),
              this.filterPlaces(baseLocation, filter.distance, filter.rating, filter.reviews)
            );
        })
      )
      .subscribe(res => this.places$.next(res));
  }

  public getPlaces(filter: Filter): Observable<Place[]> {
    this.filter$.next(filter);
    return this.places$;
  }

  public getPlaceDetails(placeId: string): Observable<Place> {
    return null;
  }

  private getQuery(southEastLocation: Location, northWestLocation: Location): QueryFn {
    return collectionReference =>
      collectionReference
        .orderBy('location', 'desc')
        .orderBy('rating', 'desc')
        .orderBy('reviews', 'desc')
        .where(
          'location',
          '<=',
          new firebase.firestore.GeoPoint(northWestLocation.latitude, northWestLocation.longitude)
        )
        .where(
          'location',
          '>=',
          new firebase.firestore.GeoPoint(southEastLocation.latitude, southEastLocation.longitude)
        );
  }

  private mapToPlaces(
    baseLocation: GeoLocation
  ): UnaryFunction<Observable<DocumentChangeAction[]>, Observable<Place[]>> {
    return map(places => {
      return places.map(place => {
        const data = place.payload.doc.data();
        const id = place.payload.doc.id;
        return <Place>{ id, location: { ...data }, ...data };
      });
    });
  }

  private filterPlaces(
    baseLocation: GeoLocation,
    distance: number,
    rating: number,
    reviews: number
  ): (source: Observable<Place[]>) => Observable<Place[]> {
    return map(places => {
      return _.chain(places)
        .map((place: Place) => {
          const distanceFromBasePoint = baseLocation.distanceTo(
            GeoLocation.fromDegrees(place.location.latitude, place.location.longitude),
            GeoLocationMeasurement.Miles
          );
          return { ...place, distance: distanceFromBasePoint };
        })
        .filter(x => x.distance <= distance && x.rating >= rating && x.reviews >= reviews)
        .sortBy(x => x.distance)
        .sortBy(x => (x.imageUrl.length ? 0 : 1))
        .value();
    });
  }

  private getLocationInfo(latitude: number, longitude: number, distance: number): [Location, Location, GeoLocation] {
    const baseGeoLocation = GeoLocation.fromDegrees(latitude, longitude);
    const edgeCoordinates = baseGeoLocation.boundingCoordinates(distance, GeoLocationMeasurement.Miles);
    const northWestLocation = <Location>{
      latitude: edgeCoordinates[1].latitudeInDegrees,
      longitude: edgeCoordinates[0].longitudeInDegrees
    };
    const southEastLocation = <Location>{
      latitude: edgeCoordinates[0].latitudeInDegrees,
      longitude: edgeCoordinates[1].longitudeInDegrees
    };

    return [northWestLocation, southEastLocation, baseGeoLocation];
  }
}
