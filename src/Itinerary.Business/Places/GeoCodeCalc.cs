using System;

namespace Itinerary.Business.Places
{
  internal static class GeoCodeCalc
  {
    private const double EarthRadiusInMiles = 3956.0;
    private const double EarthRadiusInKilometers = 6367.0;

    private static double ToRadian(double val) { return val * (Math.PI / 180); }

    private static double DiffRadian(double val1, double val2) { return ToRadian(val2) - ToRadian(val1); }

    public static double CalcDistance(double lat1, double lng1, double lat2, double lng2)
    {
      return CalcDistance(lat1, lng1, lat2, lng2, GeoCodeCalcMeasurement.Miles);
    }

    private static double CalcDistance(double lat1, double lng1, double lat2, double lng2, GeoCodeCalcMeasurement measurement)
    {
      double radius = EarthRadiusInMiles;

      if (measurement == GeoCodeCalcMeasurement.Kilometers) { radius = EarthRadiusInKilometers; }
      return radius * 2 * Math.Asin(Math.Min(1, Math.Sqrt((Math.Pow(Math.Sin((DiffRadian(lat1, lat2)) / 2.0), 2.0) + Math.Cos(ToRadian(lat1)) * Math.Cos(ToRadian(lat2)) * Math.Pow(Math.Sin((DiffRadian(lng1, lng2)) / 2.0), 2.0)))));
    }

    private enum GeoCodeCalcMeasurement
    {
      Miles = 0,
      Kilometers = 1
    }
  }
}