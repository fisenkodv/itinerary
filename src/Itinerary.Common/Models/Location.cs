namespace Itinerary.Common.Models
{
  public class Location
  {
    public Location( double lat, double lng )
    {
      Lat = lat;
      Lng = lng;
    }

    public double Lat { get; }

    public double Lng { get; }
  }
}