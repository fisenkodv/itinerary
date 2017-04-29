using System;

namespace Itinerary.Common.Utilities
{
  public class Helpers
  {
    public static double ConvertDegreesToRadians( double degrees )
    {
      return Math.PI / 180 * degrees;
    }

    public static double ConvertRadiansToDegrees( double radian )
    {
      return radian * ( 180.0 / Math.PI );
    }
  }
}
