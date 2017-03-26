using System;

namespace Itinerary.Common
{
  public static class GeoCalculations
  {
    private const double EarthRadiusInMiles = 3956.0;
    private const double EarthRadiusInKilometers = 6367.0;

    private static double ToRadian(double val) { return val * (Math.PI / 180); }

    private static double DiffRadian(double val1, double val2) { return ToRadian(val2) - ToRadian(val1); }

    public static double Distance(double latitude1, double longitude1, double latitude2, double longitude2)
    {
      return Distance(latitude1, longitude1, latitude2, longitude2, GeoCodeCalcMeasurement.Miles);
    }

    private static double Distance(double latitude1, double longitude1, double latitude2, double longitude2, GeoCodeCalcMeasurement measurement)
    {
      double radius = EarthRadiusInMiles;

      if (measurement == GeoCodeCalcMeasurement.Kilometers) { radius = EarthRadiusInKilometers; }
      return radius * 2 * Math.Asin(
               Math.Min(
                 1,
                 Math.Sqrt(
                   Math.Pow( Math.Sin( DiffRadian( latitude1, latitude2 ) / 2.0 ), 2.0 ) +
                   Math.Cos( ToRadian( latitude1 ) ) * Math.Cos( ToRadian( latitude2 ) ) * Math.Pow(
                     Math.Sin( DiffRadian( longitude1, longitude2 ) / 2.0 ), 2.0 ) ) ) );
    }

    private enum GeoCodeCalcMeasurement
    {
      Miles = 0,
      Kilometers = 1
    }
  }
}
