namespace Itinerary.Business.Places.Models
{
  public class PlaceLocation
  {
    public PlaceLocation( string name, Location location )
    {
      Name = name;
      Location = location;
    }

    public string Name { get; }

    public Location Location { get; }
  }
}
