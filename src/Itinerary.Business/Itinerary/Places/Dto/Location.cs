namespace Itinerary.Business.Itinerary.Places.Dto
{
  public class Location
  {
    public Location( double latitude, double longitude )
    {
      Latitude = latitude;
      Longitude = longitude;
    }

    public double Latitude { get; }

    public double Longitude { get; }

    public Location Clone()
    {
      return ( Location ) MemberwiseClone();
    }
  }
}
