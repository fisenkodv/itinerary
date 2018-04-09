import { Injectable } from '@angular/core';
import { Location, Place } from '@app/modules/places/models';
import { GeoLocation, GeoLocationMeasurement } from '@app/modules/places/services/geo-location';
import { AngularFirestore, DocumentChangeAction, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ItineraryPlacesService {
  constructor(private db: AngularFirestore) {}

  public getPlaces(distance: number, rating: number, reviews: number, location: Location): Observable<Place[]> {
    const [northWestLocation, southEastLocation, baseLocation] = this.getLocationInfo(
      location.latitude,
      location.longitude,
      distance
    );
    const collection = this.db.collection<Place>('places', this.getQuery(southEastLocation, northWestLocation));
    const result = collection
      .snapshotChanges()
      .pipe(this.mapToPlaces(baseLocation), this.filterPlaces(baseLocation, distance, rating, reviews));

    return result;
  }

  private getQuery(southEastLocation: Location, northWestLocation: Location): QueryFn {
    return collectionReference =>
      collectionReference
        .orderBy('longitude', 'desc')
        .orderBy('latitude', 'desc')
        .where('longitude', '<=', southEastLocation.longitude)
        .where('longitude', '>=', northWestLocation.longitude)
        // .where('latitude', '<=', northWestLocation.latitude)
        // .where('latitude', '>=', southEastLocation.latitude)
        .limit(500);
  }

  private mapToPlaces(baseLocation: GeoLocation): (source: Observable<DocumentChangeAction[]>) => Observable<Place[]> {
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
    return map(places =>
      places.filter(place => {
        const distanceFromBasePoint = baseLocation.distanceTo(
          GeoLocation.fromDegrees(place.location.latitude, place.location.longitude),
          GeoLocationMeasurement.Miles
        );
        return distanceFromBasePoint <= distance;
      })
    );
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
