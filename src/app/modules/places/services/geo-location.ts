export enum GeoLocationMeasurement {
  Miles = 0,
  Kilometers = 1
}

/**
 * Represents a point on the surface of a sphere. (The Earth is almost spherical.)
 */
export class GeoLocation {
  private static readonly MinLat: number = GeoLocation.convertDegreesToRadians(-90); // -PI/2
  private static readonly MaxLat: number = GeoLocation.convertDegreesToRadians(90); //  PI/2
  private static readonly MinLon: number = GeoLocation.convertDegreesToRadians(-180); // -PI
  private static readonly MaxLon: number = GeoLocation.convertDegreesToRadians(180); //  PI

  private static readonly EarthRadiusInKilometers: number = 6371.01;
  private static readonly EarthRadiusInMiles: number = GeoLocation.EarthRadiusInKilometers * 0.621371;

  /**
   * Constructor
   * @param radiansLatitude latitude in radians
   * @param radiansLongitude longitude in radians
   * @param degreesLatitude latitude in degrees
   * @param degreesLongitude longitude in degrees
   */
  constructor(
    private radiansLatitude: number,
    private radiansLongitude: number,
    private degreesLatitude: number,
    private degreesLongitude: number
  ) {}

  /**
   * Return GeoLocation from Degrees
   * @param latitude The latitude, in degrees.
   * @param longitude The longitude, in degrees.
   */
  public static fromDegrees(latitude: number, longitude: number): GeoLocation {
    const result = new GeoLocation(
      GeoLocation.convertDegreesToRadians(latitude),
      GeoLocation.convertDegreesToRadians(longitude),
      latitude,
      longitude
    );
    result.checkBounds();
    return result;
  }

  /**
   * Return GeoLocation from Radians
   * @param latitude The latitude, in radians.
   * @param longitude The longitude, in radians.
   */
  public static fromRadians(latitude: number, longitude: number): GeoLocation {
    const result = new GeoLocation(
      latitude,
      longitude,

      GeoLocation.convertRadiansToDegrees(latitude),
      GeoLocation.convertRadiansToDegrees(longitude)
    );
    result.checkBounds();
    return result;
  }

  private static convertDegreesToRadians(degrees: number): number {
    return Math.PI / 180 * degrees;
  }

  private static convertRadiansToDegrees(radian: number): number {
    return radian * (180.0 / Math.PI);
  }

  /**
   * return the latitude, in degrees.
   */
  public get latitudeInDegrees(): number {
    return this.degreesLatitude;
  }

  /**
   * return the longitude, in degrees.
   */
  public get longitudeInDegrees(): number {
    return this.degreesLongitude;
  }

  /**
   * return the latitude, in radians.
   */
  public get latitudeInRadians(): number {
    return this.radiansLatitude;
  }

  /**
   * return the longitude, in radians.
   */
  public get longitudeInRadians(): number {
    return this.radiansLongitude;
  }

  /**
   * Computes the great circle distance between this GeoLocation instance and the location argument.
   * @param location Location to act as the centre point
   * @param locationMeasurement Location measurement
   */
  public distanceTo(location: GeoLocation, locationMeasurement: GeoLocationMeasurement): number {
    const earthRadius =
      locationMeasurement === GeoLocationMeasurement.Kilometers
        ? GeoLocation.EarthRadiusInKilometers
        : GeoLocation.EarthRadiusInMiles;
    return (
      Math.acos(
        Math.sin(this.radiansLatitude) * Math.sin(location.latitudeInRadians) +
          Math.cos(this.radiansLatitude) *
            Math.cos(location.latitudeInRadians) *
            Math.cos(this.radiansLongitude - location.radiansLongitude)
      ) * earthRadius
    );
  }

  /**
   * Computes the great circle distance between this GeoLocation instance and the location argument.
   * @param distance Location to act as the centre point
   * @param locationMeasurement Location measurement
   */
  public boundingCoordinates(distance: number, locationMeasurement: GeoLocationMeasurement): GeoLocation[] {
    if (distance < 0) {
      throw new Error('Distance cannot be less than 0');
    }
    const earthRadius =
      locationMeasurement === GeoLocationMeasurement.Kilometers
        ? GeoLocation.EarthRadiusInKilometers
        : GeoLocation.EarthRadiusInMiles;

    // angular distance in radians on a great circle
    const radDist = distance / earthRadius;

    let minLat = this.radiansLatitude - radDist;
    let maxLat = this.radiansLatitude + radDist;

    let minLon, maxLon;
    if (minLat > GeoLocation.MinLat && maxLat < GeoLocation.MaxLat) {
      const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(this.radiansLatitude));
      minLon = this.radiansLongitude - deltaLon;
      if (minLon < GeoLocation.MinLon) {
        minLon += 2 * Math.PI;
      }
      maxLon = this.radiansLongitude + deltaLon;
      if (maxLon > GeoLocation.MaxLon) {
        maxLon -= 2 * Math.PI;
      }
    } else {
      // a pole is within the distance
      minLat = Math.max(minLat, GeoLocation.MinLat);
      maxLat = Math.min(maxLat, GeoLocation.MaxLat);
      minLon = GeoLocation.MinLon;
      maxLon = GeoLocation.MaxLon;
    }
    const result: GeoLocation[] = [GeoLocation.fromRadians(minLat, minLon), GeoLocation.fromRadians(maxLat, maxLon)];
    return result;
  }

  private checkBounds() {
    if (
      this.radiansLatitude < GeoLocation.MinLat ||
      this.radiansLatitude > GeoLocation.MaxLat ||
      this.radiansLongitude < GeoLocation.MinLon ||
      this.radiansLongitude > GeoLocation.MaxLon
    ) {
      throw new Error('Arguments are out of bounds');
    }
  }
}
