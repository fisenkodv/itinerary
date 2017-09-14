using System;

namespace Itinerary.Common
{
  public enum GeoLocationMeasurement
  {
    Miles = 0,
    Kilometers = 1
  }

  /// <summary>
  /// Represents a point on the surface of a sphere. (The Earth is almost spherical.)
  ///
  /// This code was originally published at
  /// http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates#Java
  /// 
  /// @author Jan Philip Matuschek
  /// @version 22 September 2010
  /// @converted to C# by Anthony Zigenbine on 19th October 2010
  /// </summary>
  public class GeoLocation
  {
    private double _radLat; // latitude in radians
    private double _radLon; // longitude in radians

    private double _degLat; // latitude in degrees
    private double _degLon; // longitude in degrees

    private static readonly double MinLat = DegreesConverter.ConvertDegreesToRadians(-90d); // -PI/2
    private static readonly double MaxLat = DegreesConverter.ConvertDegreesToRadians(90d); //  PI/2
    private static readonly double MinLon = DegreesConverter.ConvertDegreesToRadians(-180d); // -PI
    private static readonly double MaxLon = DegreesConverter.ConvertDegreesToRadians(180d); //  PI

    private const double EarthRadiusInKilometers = 6371.01;
    private const double EarthRadiusInMiles = EarthRadiusInKilometers * 0.621371;

    private GeoLocation()
    {
    }

    /// <summary>
    /// Return GeoLocation from Degrees
    /// </summary>
    /// <param name="latitude">The latitude, in degrees.</param>
    /// <param name="longitude">The longitude, in degrees.</param>
    /// <returns>GeoLocation in Degrees</returns>
    public static GeoLocation FromDegrees(double latitude, double longitude)
    {
      var result = new GeoLocation
                   {
                     _radLat = DegreesConverter.ConvertDegreesToRadians(latitude),
                     _radLon = DegreesConverter.ConvertDegreesToRadians(longitude),
                     _degLat = latitude,
                     _degLon = longitude
                   };
      result.CheckBounds();
      return result;
    }

    /// <summary>
    /// Return GeoLocation from Radians
    /// </summary>
    /// <param name="latitude">The latitude, in radians.</param>
    /// <param name="longitude">The longitude, in radians.</param>
    /// <returns>GeoLocation in Radians</returns>
    public static GeoLocation FromRadians(double latitude, double longitude)
    {
      var result = new GeoLocation
                   {
                     _radLat = latitude,
                     _radLon = longitude,
                     _degLat = DegreesConverter.ConvertRadiansToDegrees(latitude),
                     _degLon = DegreesConverter.ConvertRadiansToDegrees(longitude)
                   };
      result.CheckBounds();
      return result;
    }

    private void CheckBounds()
    {
      if (_radLat < MinLat || _radLat > MaxLat ||
          _radLon < MinLon || _radLon > MaxLon)
        throw new Exception("Arguments are out of bounds");
    }

    /// <summary>
    /// return the latitude, in degrees.
    /// </summary>
    /// <returns></returns>
    public double GetLatitudeInDegrees()
    {
      return _degLat;
    }

    /// <summary>
    /// return the longitude, in degrees.
    /// </summary>
    /// <returns></returns>
    public double GetLongitudeInDegrees()
    {
      return _degLon;
    }

    /// <summary>
    /// return the latitude, in radians.
    /// </summary>
    /// <returns></returns>
    public double GetLatitudeInRadians()
    {
      return _radLat;
    }

    /// <summary>
    /// return the longitude, in radians.
    /// </summary>
    /// <returns></returns>
    public double GetLongitudeInRadians()
    {
      return _radLon;
    }

    public override string ToString()
    {
      return $"({_degLat}\u00B0, {_degLon}\u00B0) = ({_radLat} rad, {_radLon} rad)";
    }

    /// <summary>
    /// Computes the great circle distance between this GeoLocation instance and the location argument.
    /// </summary>
    /// <param name="location">Location to act as the centre point</param>
    /// <param name="locationMeasurement">Location measurement</param>
    /// <returns>the distance, measured in the same unit as the radius argument.</returns>
    public double DistanceTo(GeoLocation location, GeoLocationMeasurement locationMeasurement)
    {
      double earthRadius = locationMeasurement == GeoLocationMeasurement.Kilometers
                             ? EarthRadiusInKilometers
                             : EarthRadiusInMiles;
      return Math.Acos(
               Math.Sin(_radLat) * Math.Sin(location._radLat) +
               Math.Cos(_radLat) * Math.Cos(location._radLat) *
               Math.Cos(_radLon - location._radLon)) * earthRadius;
    }

    /// <summary>
    /// Computes the bounding coordinates of all points on the surface
    /// of a sphere that have a great circle distance to the point represented
    /// by this GeoLocation instance that is less or equal to the distance
    /// argument.
    /// For more information about the formulae used in this method visit
    /// http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates
    /// </summary>
    /// <param name="distance">The distance from the point represented by this 
    /// GeoLocation instance. Must me measured in the same unit as the radius argument.
    /// </param>
    /// <param name="locationMeasurement">Location measurement</param>
    /// <returns>An array of two GeoLocation objects such that:
    /// 
    /// a) The latitude of any point within the specified distance is greater
    /// or equal to the latitude of the first array element and smaller or
    /// equal to the latitude of the second array element.
    /// If the longitude of the first array element is smaller or equal to
    /// the longitude of the second element, then
    /// the longitude of any point within the specified distance is greater
    /// or equal to the longitude of the first array element and smaller or
    /// equal to the longitude of the second array element.
    /// 
    /// b) If the longitude of the first array element is greater than the
    /// longitude of the second element (this is the case if the 180th
    /// meridian is within the distance), then
    /// the longitude of any point within the specified distance is greater
    /// or equal to the longitude of the first array element
    /// or smaller or equal to the longitude of the second
    /// array element.</returns>
    public GeoLocation[] BoundingCoordinates(double distance, GeoLocationMeasurement locationMeasurement)
    {
      if (distance < 0d)
        throw new Exception("Distance cannot be less than 0");

      double earthRadius = locationMeasurement == GeoLocationMeasurement.Kilometers
                             ? EarthRadiusInKilometers
                             : EarthRadiusInMiles;

      // angular distance in radians on a great circle
      double radDist = distance / earthRadius;

      double minLat = _radLat - radDist;
      double maxLat = _radLat + radDist;

      double minLon, maxLon;
      if (minLat > MinLat && maxLat < MaxLat)
      {
        double deltaLon = Math.Asin(
          Math.Sin(radDist) /
          Math.Cos(_radLat));
        minLon = _radLon - deltaLon;
        if (minLon < MinLon) minLon += 2d * Math.PI;
        maxLon = _radLon + deltaLon;
        if (maxLon > MaxLon) maxLon -= 2d * Math.PI;
      }
      else
      {
        // a pole is within the distance
        minLat = Math.Max(minLat, MinLat);
        maxLat = Math.Min(maxLat, MaxLat);
        minLon = MinLon;
        maxLon = MaxLon;
      }

      return new GeoLocation[]
             {
               FromRadians(minLat, minLon),
               FromRadians(maxLat, maxLon)
             };
    }
  }
}
